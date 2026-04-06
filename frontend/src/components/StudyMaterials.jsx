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
    <div className="page-container">
      <div className="page-header">
        <h1>Local Knowledge Base</h1>
        <p>These documents are vectorized and accessible to the AI teacher.</p>
      </div>

      <div className="card">
        <div className="search-bar">
          <div className="search-input-wrapper">
            <Search className="search-icon" size={18} />
            <input 
              type="text" 
              placeholder="Search local documents..." 
              className="search-input"
            />
          </div>
          <button 
            disabled={isUploading}
            onClick={handleUploadClick}
            className="btn-primary"
          >
            {isUploading ? "Reading Book..." : "Upload PDF"}
            {!isUploading && <Upload size={18} />}
          </button>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept="application/pdf" 
            style={{ display: 'none' }} 
          />
        </div>

        <div className="doc-list">
          {materials.length === 0 && <div style={{textAlign: 'center', padding: '2rem', color: 'var(--text-tertiary)'}}>No PDFs found. Upload NCERT books to get started.</div>}
          {materials.map((doc, idx) => (
            <div key={idx} className="doc-item">
              <div className="doc-info">
                <div className="doc-icon">
                  <FileText size={24} />
                </div>
                <div>
                  <div className="doc-title">{doc.title}</div>
                  <div className="doc-meta">
                    <span>{doc.type}</span>
                    <span>•</span>
                    <span>{doc.size}</span>
                    <span>•</span>
                    <span className="date">{doc.date}</span>
                  </div>
                </div>
              </div>
              
              <div className="doc-actions">
                <a href={`http://localhost:8000/files/${doc.title}`} target="_blank" rel="noopener noreferrer" title="View" className="action-icon">
                  <Eye size={18} />
                </a>
                <a href={`http://localhost:8000/files/${doc.title}`} download title="Download" className="action-icon">
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
