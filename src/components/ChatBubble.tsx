'use client';

import { useState, useRef, useEffect } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function ChatBubble() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasGreeted, setHasGreeted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => { scrollToBottom(); }, [messages]);

  useEffect(() => {
    if (isOpen && !hasGreeted) {
      setHasGreeted(true);
      const greeting = "Hello — welcome to Musicraft.\n\nWe work with artists, labels, and music businesses who are looking for more than just distribution. Whether you're building a catalog, running a label, or exploring infrastructure for your own distribution operation, we might be a good fit.\n\nTo point you in the right direction — could you tell me a bit about what you're working on?";
      setMessages([{ role: 'assistant', content: greeting }]);
    }
  }, [isOpen, hasGreeted]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;
    const userMessage = input.trim();
    setInput('');
    if (textareaRef.current) textareaRef.current.style.height = 'auto';

    const newMessages: Message[] = [...messages, { role: 'user', content: userMessage }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages })
      });
      const data = await response.json();
      const reply = data.content?.[0]?.text || "I'm sorry, something went wrong. Please try again.";
      setMessages([...newMessages, { role: 'assistant', content: reply }]);
    } catch {
      setMessages([...newMessages, { role: 'assistant', content: "I'm having trouble connecting right now. Please try again in a moment." }]);
    }
    setIsLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  const autoResize = (el: HTMLTextAreaElement) => {
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 100) + 'px';
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500&family=DM+Sans:wght@300;400;500&display=swap');

        .mc-bubble-btn {
          position: fixed;
          bottom: 28px;
          right: 28px;
          width: 56px;
          height: 56px;
          background: linear-gradient(135deg, #c9a96e, #b8934a);
          border: none;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 20px rgba(201,169,110,0.4);
          z-index: 9999;
          transition: transform 0.2s, box-shadow 0.2s;
          font-family: 'Playfair Display', serif;
          font-size: 22px;
          color: #0a0a0a;
          font-weight: 500;
        }
        .mc-bubble-btn:hover {
          transform: scale(1.08);
          box-shadow: 0 6px 28px rgba(201,169,110,0.55);
        }

        .mc-window {
          position: fixed;
          bottom: 96px;
          right: 28px;
          width: 360px;
          height: 520px;
          background: #0a0a0a;
          border: 1px solid #1e1e1e;
          border-radius: 16px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          z-index: 9998;
          box-shadow: 0 20px 60px rgba(0,0,0,0.6);
          animation: mcSlideUp 0.25s ease;
          font-family: 'DM Sans', sans-serif;
        }

        @keyframes mcSlideUp {
          from { opacity: 0; transform: translateY(16px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        .mc-header {
          padding: 14px 16px;
          border-bottom: 1px solid #1e1e1e;
          display: flex;
          align-items: center;
          gap: 10px;
          flex-shrink: 0;
        }

        .mc-logo {
          width: 30px;
          height: 30px;
          background: linear-gradient(135deg, #c9a96e, #e8c98a);
          border-radius: 7px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Playfair Display', serif;
          font-size: 15px;
          color: #0a0a0a;
          font-weight: 500;
          flex-shrink: 0;
        }

        .mc-header-text h3 {
          font-family: 'Playfair Display', serif;
          font-size: 14px;
          font-weight: 500;
          color: #e8e2d9;
          margin: 0;
        }

        .mc-header-text p {
          font-size: 10px;
          color: #6b6b6b;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin: 0;
        }

        .mc-status {
          width: 6px;
          height: 6px;
          background: #4caf82;
          border-radius: 50%;
          margin-left: auto;
          box-shadow: 0 0 6px #4caf8266;
          flex-shrink: 0;
        }

        .mc-close {
          background: none;
          border: none;
          color: #444;
          cursor: pointer;
          font-size: 18px;
          padding: 0 0 0 8px;
          line-height: 1;
          transition: color 0.15s;
        }
        .mc-close:hover { color: #888; }

        .mc-messages {
          flex: 1;
          overflow-y: auto;
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          scroll-behavior: smooth;
        }

        .mc-messages::-webkit-scrollbar { width: 3px; }
        .mc-messages::-webkit-scrollbar-thumb { background: #2a2a2a; border-radius: 2px; }

        .mc-msg {
          display: flex;
          gap: 8px;
          animation: mcFadeUp 0.25s ease;
        }

        @keyframes mcFadeUp {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .mc-msg.user { flex-direction: row-reverse; }

        .mc-avatar {
          width: 26px;
          height: 26px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .mc-avatar.agent {
          background: linear-gradient(135deg, #c9a96e22, #c9a96e44);
          border: 1px solid #c9a96e44;
          color: #c9a96e;
          font-family: 'Playfair Display', serif;
        }

        .mc-avatar.user {
          background: #1e1e1e;
          border: 1px solid #2a2a2a;
          color: #555;
        }

        .mc-bubble {
          max-width: 82%;
          padding: 10px 13px;
          border-radius: 10px;
          font-size: 13px;
          line-height: 1.6;
          font-weight: 300;
          color: #d8d2c9;
        }

        .mc-msg.agent .mc-bubble {
          background: #141414;
          border: 1px solid #1e1e1e;
          border-top-left-radius: 2px;
        }

        .mc-msg.user .mc-bubble {
          background: #1a1610;
          border: 1px solid #c9a96e33;
          color: #e8e2d9;
          border-top-right-radius: 2px;
        }

        .mc-typing {
          display: flex;
          gap: 4px;
          align-items: center;
          padding: 10px 13px;
        }

        .mc-typing span {
          width: 5px;
          height: 5px;
          background: #c9a96e;
          border-radius: 50%;
          animation: mcBounce 1.2s infinite;
          opacity: 0.5;
        }
        .mc-typing span:nth-child(2) { animation-delay: 0.2s; }
        .mc-typing span:nth-child(3) { animation-delay: 0.4s; }

        @keyframes mcBounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-4px); opacity: 1; }
        }

        .mc-input-area {
          padding: 10px 12px 12px;
          border-top: 1px solid #1e1e1e;
          flex-shrink: 0;
        }

        .mc-input-row {
          display: flex;
          gap: 8px;
          align-items: flex-end;
        }

        .mc-textarea {
          flex: 1;
          background: #111;
          border: 1px solid #2a2a2a;
          border-radius: 8px;
          color: #e8e2d9;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 300;
          padding: 9px 12px;
          resize: none;
          outline: none;
          min-height: 38px;
          max-height: 100px;
          line-height: 1.5;
          transition: border-color 0.2s;
        }
        .mc-textarea:focus { border-color: #c9a96e55; }
        .mc-textarea::placeholder { color: #333; }

        .mc-send {
          width: 38px;
          height: 38px;
          background: linear-gradient(135deg, #c9a96e, #b8934a);
          border: none;
          border-radius: 8px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: opacity 0.2s, transform 0.1s;
          flex-shrink: 0;
        }
        .mc-send:hover { opacity: 0.9; transform: scale(1.04); }
        .mc-send:disabled { opacity: 0.3; cursor: not-allowed; transform: none; }
        .mc-send svg { width: 15px; height: 15px; fill: #0a0a0a; }

        @media (max-width: 420px) {
          .mc-window { right: 12px; left: 12px; width: auto; bottom: 88px; }
          .mc-bubble-btn { right: 16px; bottom: 20px; }
        }
      `}</style>

      {/* Floating button */}
      <button className="mc-bubble-btn" onClick={() => setIsOpen(!isOpen)} aria-label="Open Musicraft chat">
        {isOpen ? '×' : 'M'}
      </button>

      {/* Chat window */}
      {isOpen && (
        <div className="mc-window">
          <div className="mc-header">
            <div className="mc-logo">M</div>
            <div className="mc-header-text">
              <h3>Musicraft</h3>
              <p>Music Infrastructure</p>
            </div>
            <div className="mc-status" />
            <button className="mc-close" onClick={() => setIsOpen(false)}>×</button>
          </div>

          <div className="mc-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`mc-msg ${msg.role === 'assistant' ? 'agent' : 'user'}`}>
                <div className={`mc-avatar ${msg.role === 'assistant' ? 'agent' : 'user'}`}>
                  {msg.role === 'assistant' ? 'M' : '↑'}
                </div>
                <div className="mc-bubble" dangerouslySetInnerHTML={{
                  __html: msg.content.replace(/\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                }} />
              </div>
            ))}
            {isLoading && (
              <div className="mc-msg agent">
                <div className="mc-avatar agent">M</div>
                <div className="mc-bubble">
                  <div className="mc-typing">
                    <span /><span /><span />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="mc-input-area">
            <div className="mc-input-row">
              <textarea
                ref={textareaRef}
                className="mc-textarea"
                placeholder="Tell us about your project..."
                value={input}
                onChange={e => { setInput(e.target.value); autoResize(e.target); }}
                onKeyDown={handleKeyDown}
                rows={1}
              />
              <button className="mc-send" onClick={sendMessage} disabled={isLoading || !input.trim()}>
                <svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
