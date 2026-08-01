import React, { useState, useRef, useEffect } from 'react';

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
}

export default function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'bot',
      text: 'Hello! 👋 Welcome to our fashion support. How can I assist you with your outfit, sizing, or styling today?',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userText = input.trim();
    setInput('');

    const userMsg: Message = { id: Date.now().toString(), sender: 'user', text: userText };
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5001/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText }),
      });

      const data = await response.json();

      if (response.ok && data.reply) {
        setMessages((prev) => [
          ...prev,
          { id: (Date.now() + 1).toString(), sender: 'bot', text: data.reply },
        ]);
      } else {
        throw new Error();
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          text: 'Sorry, there was an issue connecting to the server. Please ensure the backend server is running.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.avatar}>👠</div>
        <div>
          <h2 style={{ margin: 0, fontSize: '1.2rem' }}>Fashion Assistant</h2>
          <span style={styles.status}>● Online | Style & Support Agent</span>
        </div>
      </header>

      <div style={styles.chatBox}>
        {messages.map((msg) => (
          <div
            key={msg.id}
            style={{
              ...styles.bubble,
              alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
              backgroundColor: msg.sender === 'user' ? '#111827' : '#E5E7EB',
              color: msg.sender === 'user' ? '#FFFFFF' : '#1F2937',
            }}
          >
            {msg.text}
          </div>
        ))}
        {isLoading && <div style={styles.loading}>Agent is typing... 👗</div>}
        <div ref={messagesEndRef} />
      </div>

      <div style={styles.inputContainer}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Ask about outfits, styling, sizing..."
          style={styles.input}
        />
        <button onClick={sendMessage} disabled={isLoading} style={styles.button}>
          Send
        </button>
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: '500px',
    margin: '30px auto',
    height: '85vh',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '16px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    direction: 'ltr',
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
    border: '1px solid #E5E7EB',
  },
  header: {
    padding: '16px 20px',
    backgroundColor: '#111827',
    color: '#FFFFFF',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  avatar: { fontSize: '1.8rem' },
  status: { fontSize: '0.8rem', color: '#10B981' },
  chatBox: {
    flex: 1,
    padding: '20px',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    backgroundColor: '#FAFAFA',
  },
  bubble: {
    padding: '12px 18px',
    borderRadius: '16px',
    maxWidth: '80%',
    lineHeight: '1.5',
    fontSize: '0.95rem',
    whiteSpace: 'pre-line',
  },
  loading: { fontSize: '0.85rem', color: '#6B7280', fontStyle: 'italic' },
  inputContainer: {
    padding: '16px',
    display: 'flex',
    gap: '10px',
    borderTop: '1px solid #E5E7EB',
    backgroundColor: '#FFFFFF',
  },
  input: {
    flex: 1,
    padding: '12px 16px',
    borderRadius: '24px',
    border: '1px solid #D1D5DB',
    outline: 'none',
    fontSize: '0.95rem',
  },
  button: {
    padding: '12px 24px',
    borderRadius: '24px',
    border: 'none',
    backgroundColor: '#111827',
    color: '#FFFFFF',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
};