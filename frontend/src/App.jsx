import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { MessageSquare, User, Bot, ShieldCheck, Send, Instagram, MessageCircle, AlertCircle, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const API_BASE = 'http://127.0.0.1:8000';
const WS_URL = 'ws://127.0.0.1:8000/ws';

function App() {
  const [selectedPlatform, setSelectedPlatform] = useState('telegram');
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [wsConnected, setWsConnected] = useState(false);
  const [config, setConfig] = useState({ token: '', phone_number_id: '', verify_token: '' });
  const [isConfiguring, setIsConfiguring] = useState(false);

  const messagesEndRef = useRef(null);
  const ws = useRef(null);
  const selectedChatRef = useRef(null);

  const fetchConfig = async (platform) => {
    try {
      const response = await axios.get(`${API_BASE}/config/${platform}`);
      setConfig({
        token: response.data.token || '',
        phone_number_id: response.data.phone_number_id || '',
        verify_token: response.data.verify_token || ''
      });
      if (!response.data.token) {
        setIsConfiguring(true);
      } else {
        setIsConfiguring(false);
      }
    } catch (error) {
      console.error("Error fetching config:", error);
    }
  };

  const saveConfig = async () => {
    try {
      await axios.post(`${API_BASE}/config`, {
        platform: selectedPlatform,
        ...config
      });
      setIsConfiguring(false);
      fetchChats();
      connectWebSocket();
    } catch (error) {
      console.error("Error saving config:", error);
      alert("Failed to save configuration");
    }
  };

  const fetchChats = async () => {
    try {
      const response = await axios.get(`${API_BASE}/chats`);
      // Filter chats by the current platform in the UI
      const filteredChats = response.data.filter(c => c.platform === selectedPlatform);
      setChats(filteredChats);
    } catch (error) {
      console.error("Error fetching chats:", error);
    }
  };

  const fetchMessages = async (chatId) => {
    try {
      const response = await axios.get(`${API_BASE}/chats/${chatId}/messages`);
      setMessages(response.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  useEffect(() => {
    fetchConfig(selectedPlatform);
    fetchChats();
    connectWebSocket();

    return () => {
      // Don't close WS on platform switch to keep receiving background updates
      // but we do want to refresh the view
    };
  }, [selectedPlatform]);

  useEffect(() => {
    selectedChatRef.current = selectedChat;
    if (selectedChat) {
      fetchMessages(selectedChat.id);
    }
  }, [selectedChat]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const connectWebSocket = () => {
    if (ws.current && (ws.current.readyState === WebSocket.OPEN || ws.current.readyState === WebSocket.CONNECTING)) return;

    ws.current = new WebSocket(WS_URL);

    ws.current.onopen = () => {
      setWsConnected(true);
      console.log("WebSocket Connected");
    };

    ws.current.onmessage = (event) => {
      const data = event.data;
      if (data === "ping") return;

      console.log("WS signal:", data);
      if (data.startsWith("new_message:")) {
        const chatId = parseInt(data.split(":")[1]);
        if (selectedChatRef.current && selectedChatRef.current.id === chatId) {
          fetchMessages(chatId);
        }
        fetchChats();
      }
    };

    ws.current.onclose = (event) => {
      setWsConnected(false);
      setTimeout(() => {
        connectWebSocket();
      }, 3000);
    };
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const renderConfigPanel = () => (
    <div className="config-container">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="config-card"
        style={{ maxWidth: '500px', width: '90%' }}
      >
        <h2>Configure {selectedPlatform.charAt(0).toUpperCase() + selectedPlatform.slice(1)}</h2>
        <p>Enter your credentials to start supervising chats.</p>

        <div className="form-group">
          <label>Access Token / Bot Token</label>
          <input
            type="password"
            placeholder="Enter token here..."
            value={config.token}
            onChange={(e) => setConfig({ ...config, token: e.target.value })}
          />
        </div>

        {selectedPlatform === 'whatsapp' && (
          <>
            <div className="form-group">
              <label>Phone Number ID</label>
              <input
                type="text"
                placeholder="e.g. 1015033328351798"
                value={config.phone_number_id}
                onChange={(e) => setConfig({ ...config, phone_number_id: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Webhook Verify Token</label>
              <input
                type="text"
                placeholder="e.g. my_secret_token_123"
                value={config.verify_token}
                onChange={(e) => setConfig({ ...config, verify_token: e.target.value })}
              />
            </div>
          </>
        )}

        <button className="save-btn" onClick={saveConfig} disabled={!config.token}>
          Save & Initialize
        </button>
      </motion.div>
    </div>
  );

  return (
    <div className="app-container">
      <div className="platforms-panel">
        <button
          className={`platform-btn ${selectedPlatform === 'telegram' ? 'active' : ''}`}
          onClick={() => setSelectedPlatform('telegram')}
        >
          <Send size={24} />
        </button>
        <button
          className={`platform-btn ${selectedPlatform === 'whatsapp' ? 'active' : ''}`}
          onClick={() => setSelectedPlatform('whatsapp')}
        >
          <MessageCircle size={24} />
        </button>
        <button
          className={`platform-btn ${selectedPlatform === 'instagram' ? 'active' : ''}`}
          onClick={() => setSelectedPlatform('instagram')}
        >
          <Instagram size={24} />
        </button>
      </div>

      <div className="sidebar">
        <div className="sidebar-header">
          <ShieldCheck color={selectedPlatform === 'telegram' ? '#0088cc' : '#10b981'} size={24} />
          <h1>{selectedPlatform.charAt(0).toUpperCase() + selectedPlatform.slice(1)} Supervisor</h1>
          <div
            className={`status-indicator`}
            style={{
              backgroundColor: wsConnected ? '#10b981' : '#ef4444',
              boxShadow: wsConnected ? '0 0 8px #10b981' : 'none'
            }}
          ></div>
          <button
            onClick={() => setIsConfiguring(true)}
            style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', marginLeft: 'auto' }}
          >
            <Settings size={18} />
          </button>
        </div>
        <div className="chat-list">
          {chats.length === 0 ? (
            <div className="empty-state" style={{ padding: '20px', textAlign: 'center', fontSize: '0.9rem' }}>
              No active {selectedPlatform} chats yet
            </div>
          ) : (
            chats.map((chat) => (
              <div
                key={chat.id}
                className={`chat-item ${selectedChat?.id === chat.id ? 'active' : ''}`}
                onClick={() => setSelectedChat(chat)}
              >
                <div className="chat-item-name">
                  {chat.first_name || chat.external_id} {chat.last_name || ''}
                  {chat.username && <span style={{ color: '#94a3b8', fontSize: '0.8rem', marginLeft: '5px' }}>@{chat.username}</span>}
                </div>
                <div className="chat-item-last-msg">
                  ID: {chat.external_id}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="main-chat">
        {isConfiguring ? (
          renderConfigPanel()
        ) : selectedChat ? (
          <>
            <div className="chat-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ backgroundColor: '#1e293b', padding: '8px', borderRadius: '50%' }}>
                  <User size={20} />
                </div>
                <div>
                  <div style={{ fontWeight: '600' }}>{selectedChat.first_name || selectedChat.external_id} {selectedChat.last_name || ''}</div>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{selectedPlatform.charAt(0).toUpperCase() + selectedPlatform.slice(1)} ID: {selectedChat.external_id}</div>
                </div>
              </div>
              <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Monitoring Active</div>
            </div>

            <div className="messages-container">
              <AnimatePresence>
                {messages.map((msg) => (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={msg.id}
                    className={`message ${msg.sender}`}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px', fontSize: '0.75rem', opacity: 0.8 }}>
                      {msg.sender === 'bot' ? <Bot size={12} /> : <User size={12} />}
                      {msg.sender.toUpperCase()}
                    </div>
                    {msg.text}
                    <span className="message-time">
                      {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </motion.div>
                ))}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>
          </>
        ) : (
          <div className="empty-state">
            <MessageSquare size={48} style={{ marginBottom: '16px', opacity: 0.2 }} />
            <p>Select a {selectedPlatform} chat to start supervising</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
