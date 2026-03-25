'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

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
  const [logged, setLogged] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const inactivityTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => { scrollToBottom(); }, [messages]);

  useEffect(() => {
    if (isOpen && !hasGreeted) {
      setHasGreeted(true);
      const greeting = "Hello — welcome to Musicraft.\n\nWe work with artists, labels, and music businesses who are looking for more than just distribution. Whether you're building a catalog, running a label, or exploring infrastructure for your own distribution operation, we might be a good fit.\n\nCould you tell me a bit about what you're working on?";
      setMessages([{ role: 'assistant', content: greeting }]);
    }
  }, [isOpen, hasGreeted]);

  // Log conversation after 3 minutes of inactivity or when closed
  const logConversation = useCallback(async (msgs: Message[]) => {
    if (logged || msgs.length < 3) return;
    setLogged(true);
    try {
      await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: msgs, conversationEnded: true }),
      });
    } catch {}
  }, [logged]);

  // Reset inactivity timer on each new message
  useEffect(() => {
    if (messages.length < 3) return;
    if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    inactivityTimer.current = setTimeout(() => {
      logConversation(messages);
    }, 3 * 60 * 1000); // 3 minutes

    return () => {
      if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    };
  }, [messages, logConversation]);

  // Log when chat is closed
  const handleClose = () => {
    setIsOpen(false);
    logConversation(messages);
  };

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
        body: JSON.stringify({ messages: newMessages }),
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
        .mc-bubble-btn {
          position: fixed;
          bottom: 28px;
          right: 28px;
          width: 56px;
          height: 56px;
          background: linear-gradient(135deg, #7c6fde, #4fb8d4);
          border: none;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 24px rgba(124, 111, 222, 0.45);
          z-index: 9999;
          transition: transform 0.2s, box-shadow 0.2s;
          color: #fff;
          font-size: 13px;
          font-weight: 600;
          font-family: system-ui, sans-serif;
          letter-spacing: 0.03em;
        }
        .mc-bubble-btn:hover {
          transform: scale(1.08);
          box-shadow: 0 8px 32px rgba(124, 111, 222, 0.6);
        }
        .mc-bubble-btn svg {
          width: 22px;
          height: 22px;
          fill: white;
        }

        .mc-window {
          position: fixed;
          bottom: 96px;
          right: 28px;
          width: 368px;
          height: 530px;
          background: #16112e;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 20px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          z-index: 9998;
          box-shadow: 0 24px 64px rgba(0,0,0,0.7), 0 0 0 1px rgba(124,111,222,0.15);
          animation: mcSlideUp 0.28s cubic-bezier(0.34, 1.56, 0.64, 1);
          font-family: system-ui, -apple-system, sans-serif;
        }

        @keyframes mcSlideUp {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        .mc-header {
          padding: 16px 18px;
          background: linear-gradient(135deg, rgba(124,111,222,0.2), rgba(79,184,212,0.1));
          border-bottom: 1px solid rgba(255,255,255,0.07);
          display: flex;
          align-items: center;
          gap: 11px;
          flex-shrink: 0;
        }

        .mc-logo {
          width: 34px;
          height: 34px;
          background: linear-gradient(135deg, #7c6fde, #4fb8d4);
          border-radius: 9px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .mc-logo svg { width: 18px; height: 18px; fill: white; }

        .mc-header-text h3 {
          font-size: 14px;
          font-weight: 600;
          color: #fff;
          margin: 0;
          letter-spacing: 0.01em;
        }

        .mc-header-text p {
          font-size: 11px;
          color: rgba(255,255,255,0.4);
          text-transform: uppercase;
          letter-spacing: 0.06em;
          margin: 1px 0 0;
        }

        .mc-header-right {
          margin-left: auto;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .mc-status-pill {
          display: flex;
          align-items: center;
          gap: 5px;
          background: rgba(74, 222, 128, 0.12);
          border: 1px solid rgba(74, 222, 128, 0.25);
          border-radius: 20px;
          padding: 3px 9px;
          font-size: 10px;
          color: #4ade80;
          font-weight: 500;
          letter-spacing: 0.04em;
        }

        .mc-status-dot {
          width: 5px;
          height: 5px;
          background: #4ade80;
          border-radius: 50%;
          box-shadow: 0 0 5px #4ade80;
        }

        .mc-close {
          background: rgba(255,255,255,0.07);
          border: none;
          color: rgba(255,255,255,0.5);
          cursor: pointer;
          width: 26px;
          height: 26px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          line-height: 1;
          transition: background 0.15s, color 0.15s;
        }
        .mc-close:hover { background: rgba(255,255,255,0.12); color: #fff; }

        .mc-messages {
          flex: 1;
          overflow-y: auto;
          padding: 18px 16px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          scroll-behavior: smooth;
        }

        .mc-messages::-webkit-scrollbar { width: 3px; }
        .mc-messages::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 2px; }

        .mc-msg {
          display: flex;
          gap: 9px;
          animation: mcFadeUp 0.22s ease;
        }

        @keyframes mcFadeUp {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .mc-msg.user { flex-direction: row-reverse; }

        .mc-avatar {
          width: 28px;
          height: 28px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .mc-avatar.agent { background: linear-gradient(135deg, #7c6fde, #4fb8d4); }
        .mc-avatar.agent svg { width: 14px; height: 14px; fill: white; }

        .mc-avatar.user {
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.1);
          color: rgba(255,255,255,0.4);
          font-size: 11px;
          font-weight: 500;
        }

        .mc-bubble {
          max-width: 80%;
          padding: 11px 14px;
          border-radius: 14px;
          font-size: 13px;
          line-height: 1.65;
          font-weight: 400;
        }

        .mc-msg.agent .mc-bubble {
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.08);
          color: rgba(255,255,255,0.85);
          border-top-left-radius: 3px;
        }

        .mc-msg.user .mc-bubble {
          background: linear-gradient(135deg, rgba(124,111,222,0.35), rgba(79,184,212,0.25));
          border: 1px solid rgba(124,111,222,0.3);
          color: #fff;
          border-top-right-radius: 3px;
        }

        .mc-typing {
          display: flex;
          gap: 4px;
          align-items: center;
          padding: 4px 2px;
        }

        .mc-typing span {
          width: 5px;
          height: 5px;
          background: rgba(79,184,212,0.7);
          border-radius: 50%;
          animation: mcBounce 1.2s infinite;
        }
        .mc-typing span:nth-child(2) { animation-delay: 0.2s; }
        .mc-typing span:nth-child(3) { animation-delay: 0.4s; }

        @keyframes mcBounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-5px); opacity: 1; }
        }

        .mc-input-area {
          padding: 10px 14px 14px;
          border-top: 1px solid rgba(255,255,255,0.07);
          background: rgba(0,0,0,0.15);
          flex-shrink: 0;
        }

        .mc-input-row {
          display: flex;
          gap: 8px;
          align-items: flex-end;
        }

        .mc-textarea {
          flex: 1;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          color: #fff;
          font-family: system-ui, -apple-system, sans-serif;
          font-size: 13px;
          font-weight: 400;
          padding: 10px 14px;
          resize: none;
          outline: none;
          min-height: 40px;
          max-height: 100px;
          line-height: 1.5;
          transition: border-color 0.2s, background 0.2s;
        }
        .mc-textarea:focus {
          border-color: rgba(124,111,222,0.5);
          background: rgba(255,255,255,0.08);
        }
        .mc-textarea::placeholder { color: rgba(255,255,255,0.25); }

        .mc-send {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #7c6fde, #4fb8d4);
          border: none;
          border-radius: 12px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: opacity 0.2s, transform 0.1s;
          flex-shrink: 0;
          box-shadow: 0 2px 12px rgba(124,111,222,0.4);
        }
        .mc-send:hover { opacity: 0.9; transform: scale(1.05); }
        .mc-send:active { transform: scale(0.96); }
        .mc-send:disabled { opacity: 0.3; cursor: not-allowed; transform: none; box-shadow: none; }
        .mc-send svg { width: 15px; height: 15px; fill: white; }

        .mc-footer {
          text-align: center;
          font-size: 10px;
          color: rgba(255,255,255,0.18);
          margin-top: 8px;
          letter-spacing: 0.04em;
        }

        @media (max-width: 420px) {
          .mc-window { right: 10px; left: 10px; width: auto; bottom: 90px; }
          .mc-bubble-btn { right: 16px; bottom: 20px; }
        }
      `}</style>

      <button className="mc-bubble-btn" onClick={() => setIsOpen(!isOpen)} aria-label="Chat with Musicraft">
        {isOpen ? (
          <svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
        ) : (
          <svg viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/></svg>
        )}
      </button>

      {isOpen && (
        <div className="mc-window">
          <div className="mc-header">
            <div className="mc-logo">
              <svg viewBox="0 0 24 24"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>
            </div>
            <div className="mc-header-text">
              <h3>Musicraft</h3>
              <p>Distribution & Infrastructure</p>
            </div>
            <div className="mc-header-right">
              <div className="mc-status-pill">
                <div className="mc-status-dot" />
                Online
              </div>
              <button className="mc-close" onClick={handleClose}>×</button>
            </div>
          </div>

          <div className="mc-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`mc-msg ${msg.role === 'assistant' ? 'agent' : 'user'}`}>
                <div className={`mc-avatar ${msg.role === 'assistant' ? 'agent' : 'user'}`}>
                  {msg.role === 'assistant' ? (
                    <svg viewBox="0 0 24 24"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>
                  ) : '↑'}
                </div>
                <div className="mc-bubble" dangerouslySetInnerHTML={{
                  __html: msg.content
                    .replace(/\n/g, '<br>')
                    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                }} />
              </div>
            ))}
            {isLoading && (
              <div className="mc-msg agent">
                <div className="mc-avatar agent">
                  <svg viewBox="0 0 24 24"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>
                </div>
                <div className="mc-bubble">
                  <div className="mc-typing"><span /><span /><span /></div>
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
            <div className="mc-footer">Musicraft · Music Infrastructure & Distribution</div>
          </div>
        </div>
      )}
    </>
  );
}
