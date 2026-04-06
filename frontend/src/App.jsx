import React, { useState } from 'react';
import ChatInterface from './components/ChatInterface';
import StudyMaterials from './components/StudyMaterials';
import Gamification from './components/Gamification';
import { BookOpen, MessageSquare, Trophy, Network } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('chat');

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans text-slate-800">
      
      {/* Sidebar */}
      <aside className="w-20 lg:w-64 bg-white border-r border-slate-200 flex flex-col justify-between shadow-sm z-10 transition-all duration-300">
        <div>
          <div className="p-4 flex items-center justify-center lg:justify-start lg:px-6 h-20 border-b border-slate-100">
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-2 rounded-xl shadow-md lg:mr-3">
              <Network size={28} />
            </div>
            <h1 className="hidden lg:block text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
              Offline AI
            </h1>
          </div>
          
          <nav className="mt-6 flex flex-col gap-2 px-3">
            <NavItem 
              active={activeTab === 'chat'} 
              onClick={() => setActiveTab('chat')} 
              icon={<MessageSquare size={22} />} 
              label="Classroom Chat" 
            />
            <NavItem 
              active={activeTab === 'materials'} 
              onClick={() => setActiveTab('materials')} 
              icon={<BookOpen size={22} />} 
              label="Library & PDFs" 
            />
            <NavItem 
              active={activeTab === 'stats'} 
              onClick={() => setActiveTab('stats')} 
              icon={<Trophy size={22} />} 
              label="My Progress" 
            />
          </nav>
        </div>
        
        <div className="p-4 lg:p-6 text-center border-t border-slate-100">
          <div className="inline-flex items-center gap-2 justify-center w-full px-3 py-2 bg-emerald-50 text-emerald-700 rounded-full text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="hidden lg:inline">Offline Mode Active</span>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto relative w-full h-full">
        {/* Abstract background blobs for wow factor */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
          <div className="absolute top-[-10%] right-[-5%] w-96 h-96 rounded-full bg-indigo-300/20 blur-3xl mix-blend-multiply"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-blue-300/20 blur-3xl mix-blend-multiply"></div>
        </div>
        
        <div className="h-full p-4 md:p-8">
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
    className={`flex items-center p-3 rounded-xl transition-all duration-200 group ${
      active 
        ? 'bg-indigo-50 text-indigo-700 shadow-sm' 
        : 'hover:bg-slate-50 text-slate-500 hover:text-slate-800'
    }`}
  >
    <div className={`${active ? 'scale-110' : 'group-hover:scale-110'} transition-transform duration-200`}>
      {icon}
    </div>
    <span className={`hidden lg:block ml-3 font-medium ${active ? 'font-semibold' : ''}`}>
      {label}
    </span>
  </button>
);

export default App;
