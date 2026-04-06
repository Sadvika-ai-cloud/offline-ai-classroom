import React, { useState, useRef, useEffect } from 'react';
import { Send, FileText, Bot, User, Mic } from 'lucide-react';

export default function ChatInterface() {
  const [messages, setMessages] = useState([
    { role: 'system', content: 'Hello! I am your Offline AI Teacher. You can ask me anything about Class 10 subjects or search your NCERT books.' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:8000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage.content, generate_quiz: true }),
      });
      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.response, context_used: data.context_used }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: "Backend offline. Mock reply: The reflection of light is when light bounces off an object. If the surface is smooth and shiny, like glass, water or polished metal, the light will reflect at the same angle as it hit the surface." }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto backdrop-blur-xl bg-white/60 border border-white/50 shadow-xl rounded-3xl overflow-hidden">
      
      {/* Header */}
      <div className="bg-white/80 border-b border-slate-200/60 p-5 flex items-center justify-between z-10 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="bg-green-100 p-2 rounded-full text-green-600">
            <Bot size={24} />
          </div>
          <div>
            <h2 className="font-bold text-lg text-slate-800">AI Teacher Assistant</h2>
            <p className="text-xs text-slate-500 font-medium">Ready to help with Science & Maths</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center shadow-sm ${msg.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-gradient-to-br from-teal-400 to-green-500 text-white'}`}>
              {msg.role === 'user' ? <User size={20} /> : <Bot size={20} />}
            </div>
            
            <div className={`max-w-[80%] flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
              <div className={`p-4 rounded-2xl shadow-sm leading-relaxed whitespace-pre-wrap ${
                msg.role === 'user' 
                  ? 'bg-indigo-600 text-white rounded-tr-sm' 
                  : 'bg-white text-slate-800 rounded-tl-sm border border-slate-100'
              }`}>
                {msg.content}
              </div>
              
              {/* Context Tag if used */}
              {msg.context_used && (
                <div className="mt-2 text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md flex items-center gap-1 border border-emerald-100 shadow-sm">
                  <FileText size={12} />
                  Based on local NCERT Book
                </div>
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-slate-200 animate-pulse"></div>
            <div className="p-4 rounded-2xl bg-white shadow-sm animate-pulse w-32 h-12 rounded-tl-sm border border-slate-100"></div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white/80 border-t border-slate-200/60 p-4 relative z-10 backdrop-blur-md">
        <div className="relative flex items-center max-w-4xl mx-auto group">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask a question..."
            className="w-full bg-white border border-slate-300 rounded-full py-4 pl-6 pr-24 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium text-slate-700 shadow-sm placeholder-slate-400"
          />
          <div className="absolute right-2 flex items-center gap-2">
            <button className="p-2 text-slate-400 hover:text-indigo-500 hover:bg-indigo-50 rounded-full transition-colors">
              <Mic size={20} />
            </button>
            <button 
              onClick={handleSend}
              className="bg-indigo-600 hover:bg-indigo-700 text-white p-2.5 rounded-full transition-colors shadow-md disabled:opacity-50"
              disabled={loading || !input.trim()}
            >
              <Send size={18} className="translate-x-0.5" />
            </button>
          </div>
        </div>
        <p className="text-center text-[10px] text-slate-400 mt-4 font-bold tracking-widest uppercase">
          Running Entirely Offline ⚡ Server: Localhost
        </p>
      </div>
    </div>
  );
}
