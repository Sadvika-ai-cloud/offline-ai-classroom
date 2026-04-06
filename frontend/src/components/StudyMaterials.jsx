import React, { useState, useEffect, useRef } from 'react';
import { FileText, Download, Eye, Search, Upload } from 'lucide-react';

export default function StudyMaterials() {
  const [materials, setMaterials] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const fetchMaterials = async () => {
    try {
      const res = await fetch('http://localhost:8000/materials');
      if (res.ok) {
        const data = await res.json();
        setMaterials(data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchMaterials();
  }, []);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      await fetch('http://localhost:8000/upload', {
        method: 'POST',
        body: formData,
      });
      await fetchMaterials();
    } catch (err) {
      console.error("Upload failed", err);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Local Knowledge Base</h1>
        <p className="text-slate-500 mt-2">These documents are vectorized and accessible to the AI teacher.</p>
      </div>

      <div className="bg-white/60 backdrop-blur-xl border border-white shadow-xl rounded-3xl p-6 mb-8">
        <div className="flex gap-4 items-center mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search local documents..." 
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-white/80 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
            />
          </div>
          <button 
            disabled={isUploading}
            onClick={handleUploadClick}
            className="bg-slate-800 text-white px-6 py-3 rounded-xl font-medium hover:bg-slate-700 transition disabled:opacity-75 flex items-center gap-2"
          >
            {isUploading ? "Reading Book..." : "Upload PDF"}
            {!isUploading && <Upload size={18} />}
          </button>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept="application/pdf" 
            className="hidden" 
          />
        </div>

        <div className="space-y-4">
          {materials.map((doc, idx) => (
            <div key={idx} className="group flex items-center justify-between p-4 rounded-2xl bg-white hover:bg-slate-50 border border-slate-100 shadow-sm transition-all hover:shadow-md cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="bg-red-50 p-3 rounded-xl text-red-500 group-hover:scale-110 transition-transform">
                  <FileText size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800">{doc.title}</h3>
                  <div className="flex items-center gap-3 text-xs text-slate-400 mt-1 font-medium">
                    <span>{doc.type}</span>
                    <span>•</span>
                    <span>{doc.size}</span>
                    <span>•</span>
                    <span className="text-emerald-500">{doc.date}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <a href={`http://localhost:8000/files/${doc.title}`} target="_blank" rel="noopener noreferrer" title="View" className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg inline-flex">
                  <Eye size={18} />
                </a>
                <a href={`http://localhost:8000/files/${doc.title}`} download title="Download" className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg inline-flex">
                  <Download size={18} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
