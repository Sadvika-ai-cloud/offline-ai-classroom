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
      setMessages(prev => [...prev, { role: 'assistant', content: "Backend offline. Mock reply: The reflection of light is when light bounces off an object. If the surface is smooth and shiny..." }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="chat-container">
      {/* Header */}
      <div className="chat-header">
        <div className="bot-avatar-header">
          <Bot size={20} />
        </div>
        <div className="chat-header-text">
          <h2>AI Teacher Assistant</h2>
          <p>Ready to help with Science & Maths</p>
        </div>
      </div>

      {/* Messages */}
      <div className="chat-messages">
        {messages.map((msg, idx) => (
          <div key={idx} className={`message-row ${msg.role === 'user' ? 'user' : 'bot'}`}>
            <div className={`avatar ${msg.role === 'user' ? 'user' : 'bot'}`}>
              {msg.role === 'user' ? <User size={18} /> : <Bot size={18} />}
            </div>
            
            <div className="message-content-wrapper">
              <div className="message-bubble">
                {msg.content}
              </div>
              
              {/* Context Tag if used */}
              {msg.context_used && (
                <div className="context-tag">
                  <FileText size={10} />
                  Based on local NCERT Book
                </div>
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div className="message-row bot pt-2">
            <div className="avatar bot">
              <Bot size={18} />
            </div>
            <div className="message-content-wrapper">
              <div className="message-bubble typing-pulse">
                <div></div><div></div><div></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="chat-input-area">
        <div className="input-wrapper">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask a question..."
            className="chat-input"
          />
          <button 
            onClick={handleSend}
            className="send-btn"
            disabled={loading || !input.trim()}
          >
            <Send size={16} style={{ marginLeft: '2px' }} />
          </button>
        </div>
        <div className="server-status-text">
          Running Entirely Offline ⚡ Server: Localhost
        </div>
      </div>
    </div>
  );
}
