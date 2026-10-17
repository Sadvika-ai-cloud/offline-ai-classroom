# Offline AI Classroom

An AI learning assistant that runs **completely offline**. A locally hosted language model answers students' doubts and serves study resources over a local Wi-Fi network, so students in low-connectivity areas can learn with AI without needing the internet.

> **Status:** In progress. Core features work locally; Raspberry Pi deployment is being finalized.



## The Problem

Many students do not have reliable internet at home or school, so cloud AI tools like ChatGPT are out of reach. They are the students who could benefit most from instant doubt-solving and study help.

## The Solution

Run the AI where the students are. A small local server hosts the model and a simple web interface. Anyone on the same Wi-Fi network can open the page in a browser and ask questions, with **no internet connection required**.

## Features

- Offline AI doubt-solving powered by a local LLM served through **Ollama**
- Simple web interface (HTML, CSS, JavaScript) that works in any browser on the local network
- Flask backend that connects the interface to the model
- Local Wi-Fi server architecture designed to run on a **Raspberry Pi**
- Study resources available offline:

## How It Works

```
Student's device (browser)
        |   local Wi-Fi
        v
Frontend (HTML / CSS / JS)
        |   HTTP requests
        v
Flask backend  -->  Ollama (local LLM)
```

1. A student opens the web page from any device on the local network.
2. The frontend sends the question to the Flask backend.
3. The backend passes it to the model running in Ollama.
4. The answer is sent back and shown in the browser.

## Tech Stack

| Layer | Technology |
|---|---|
| Language | Python, JavaScript |
| Backend | Flask |
| AI / GenAI | Ollama (model:  llama3.2) |
| Frontend | HTML, CSS, JavaScript |
| Hardware | Raspberry Pi (target deployment) |

## Project Structure

```
offline-ai-classroom/
├── backend/          # Flask server and model integration
├── frontend/         # Web interface
└── start_servers.bat # Starts the servers (Windows)
```

## Getting Started

### Prerequisites

- Python 3.9 or newer
- [Ollama](https://ollama.com) installed, with a model downloaded (internet is needed once for this step only)

### Setup

```bash
# 1. Clone the repository
git clone https://github.com/Sadvika-ai-cloud/offline-ai-classroom.git
cd offline-ai-classroom

# 2. Download a model once (needs internet)
ollama pull 

# 3. Install backend dependencies
cd backend
pip install -r requirements.txt   # add a requirements.txt if one is not there yet
cd ..
```

### Run

On Windows, double-click or run:

```bash
start_servers.bat
```

Then open the address shown in the terminal (for example `http://localhost`).
To use it from other devices, connect them to the same Wi-Fi network and open `http://[HOST-IP].

## Roadmap

- [ ] Finish Raspberry Pi deployment and Wi-Fi hotspot setup
- [ ] Add more offline study resources
- [ ] Improve response speed on low-power hardware
- [ ] Android app deployment

## Why I Built This

I wanted to explore how GenAI can reach people with limited connectivity, and to learn how to deploy language models on small, local hardware instead of relying on the cloud.

## Author

**Sadvika Y**: B.E. Computer Science (AI & ML), RYMEC, Ballari
[LinkedIn](https://www.linkedin.com/in/sadvika-reddy-yatkal-6aa5bb332/) · [GitHub](https://github.com/Sadvika-ai-cloud)
