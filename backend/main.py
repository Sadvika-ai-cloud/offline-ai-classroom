import sqlite3
import os
import chromadb
import ollama
import time
from fastapi import FastAPI, Depends, BackgroundTasks, UploadFile, File
from fastapi.staticfiles import StaticFiles
from pypdf import PdfReader
from pydantic import BaseModel
from typing import Optional

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Offline AI Classroom API")

# Allow CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create data dir and serve static files for download/view
os.makedirs("data", exist_ok=True)
app.mount("/files", StaticFiles(directory="data"), name="files")

# ChromaDB Setup
CHROMA_DATA_PATH = "chroma_db_store"
chroma_client = chromadb.PersistentClient(path=CHROMA_DATA_PATH)
collection = chroma_client.get_or_create_collection(name="ncert_study_material", metadata={"hnsw:space": "cosine"})

# Models
class ChatRequest(BaseModel):
    message: str
    user_id: str = "guest_student"
    generate_quiz: bool = False

def log_chat(user_id, role, content):
    DB_FILENAME = "classroom_data.db"
    if not os.path.exists(DB_FILENAME):
        return
    conn = sqlite3.connect(DB_FILENAME)
    conn.execute('INSERT INTO chat_history (user_id, role, content) VALUES (?, ?, ?)', (user_id, role, content))
    conn.commit()
    conn.close()

def chunk_text(text, chunk_size=1000, overlap=100):
    chunks = []
    start = 0
    while start < len(text):
        chunks.append(text[start:start+chunk_size])
        start += chunk_size - overlap
    return chunks

@app.post("/upload")
def upload_pdf(file: UploadFile = File(...)):
    data_dir = "data"
    os.makedirs(data_dir, exist_ok=True)
    file_path = os.path.join(data_dir, file.filename)
    with open(file_path, "wb") as f:
        f.write(file.file.read())
    
    # Extract text and chunk
    reader = PdfReader(file_path)
    full_text = ""
    for page in reader.pages:
        text = page.extract_text()
        if text:
            full_text += text
            
    chunks = chunk_text(full_text)
    
    docs = []
    ids = []
    metadatas = []
    base_name = file.filename
    
    for i, chunk in enumerate(chunks):
        docs.append(chunk)
        ids.append(f"{base_name}_chunk_{i}")
        metadatas.append({"source": base_name, "chunk_index": i})
        
    collection.add(
        documents=docs,
        metadatas=metadatas,
        ids=ids
    )
    
    return {"filename": file.filename, "message": f"Successfully ingested {len(docs)} chunks."}

@app.get("/materials")
def list_materials():
    data_dir = "data"
    os.makedirs(data_dir, exist_ok=True)
    materials = []
    for f in os.listdir(data_dir):
        if f.endswith(".pdf"):
            size_mb = os.path.getsize(os.path.join(data_dir, f)) / (1024 * 1024)
            materials.append({
                "title": f,
                "type": "PDF",
                "size": f"{size_mb:.1f} MB",
                "date": "Local"
            })
    return materials

@app.get("/")
def read_root():
    return {"status": "Backend and RAG Engine running"}

@app.post("/chat")
def chat(request: ChatRequest, bg_tasks: BackgroundTasks):
    student_query = request.message
    
    # 1. Semantic Search
    results = collection.query(
        query_texts=[student_query],
        n_results=2
    )
    
    context_text = ""
    if results['documents'] and len(results['documents'][0]) > 0:
        context_text = "\n\n".join(results['documents'][0])
        
    # 2. Build Prompt
    system_prompt = f"""You are a helpful, simple, and friendly Offline AI Teacher for Class 10 students.
Explain concepts as easily as possible.

Relevant study material excerpt:
{context_text}

Answer the student's question using the excerpt if relevant. Otherwise, use your own knowledge. 
"""
    if request.generate_quiz:
        system_prompt += "\nAt the very end of your response, ask ONE multiple-choice question to test their understanding on what you just taught them."

    # 3. Request LLM
    try:
        print(f"--> Received question: '{student_query}'")
        print("--> Asking Ollama (llama3). This might take 30-60 seconds depending on your PC...")
        start_t = time.time()
        
        response = ollama.chat(model='llama3', messages=[
            {'role': 'system', 'content': system_prompt},
            {'role': 'user', 'content': student_query}
        ])
        ai_msg = response['message']['content']
        
        elapsed = time.time() - start_t
        print(f"--> Ollama finished responding in {elapsed:.1f} seconds!")
        
        bg_tasks.add_task(log_chat, request.user_id, "user", student_query)
        bg_tasks.add_task(log_chat, request.user_id, "assistant", ai_msg)
        
        return {"response": ai_msg, "context_used": bool(context_text)}
        
    except Exception as e:
        return {"response": f"AI engine error: Is Ollama running? Error: {str(e)}"}
