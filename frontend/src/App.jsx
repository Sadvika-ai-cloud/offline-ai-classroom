import React, { useState } from 'react';
import ChatInterface from './components/ChatInterface';
import StudyMaterials from './components/StudyMaterials';
import Gamification from './components/Gamification';
import { BookOpen, MessageSquare, Trophy, Network } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('chat');

  return (
    <div className="app-container">
      {/* Background Orbs */}
      <div className="bg-blobs">
        <div className="blob-1"></div>
        <div className="blob-2"></div>
      </div>
      
      {/* Sidebar */}
      <aside className="sidebar">
        <div>
          <div className="sidebar-header">
            <div className="brand-icon">
              <Network size={24} />
            </div>
            <h1 className="brand-text">
              Offline AI
            </h1>
          </div>
          
          <nav className="nav-menu">
            <NavItem 
              active={activeTab === 'chat'} 
              onClick={() => setActiveTab('chat')} 
              icon={<MessageSquare size={20} />} 
              label="Classroom Chat" 
            />
            <NavItem 
              active={activeTab === 'materials'} 
              onClick={() => setActiveTab('materials')} 
              icon={<BookOpen size={20} />} 
              label="Library & PDFs" 
            />
            <NavItem 
              active={activeTab === 'stats'} 
              onClick={() => setActiveTab('stats')} 
              icon={<Trophy size={20} />} 
              label="My Progress" 
            />
          </nav>
        </div>
        
        <div className="status-badge">
          <span className="status-dot"></span>
          <span>Offline Mode Active</span>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="main-content">
        <div className="glass-panel" style={{ height: '100%' }}>
          {activeTab === 'chat' && <ChatInterface />}
          {activeTab === 'materials' && <StudyMaterials />}
          {activeTab === 'stats' && <Gamification />}
        </div>
      </main>
    </div>
  );
}

const NavItem = ({ active, icon, label, onClick }) => (
  <button
    onClick={onClick}
    className={`nav-item ${active ? 'active' : ''}`}
  >
    <div className="icon-wrapper" style={{ transform: active ? 'scale(1.1)' : 'scale(1)', transition: 'transform 0.2s' }}>
      {icon}
    </div>
    <span>
      {label}
    </span>
  </button>
);

export default App;
