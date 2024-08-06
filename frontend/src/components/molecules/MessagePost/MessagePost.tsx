import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import './MessagePost.css';

// 임시 메시지 데이터
const initialMessages: { [key: string]: { sender: string; text: string; time: string; }[] } = {
  '1': [
    { sender: '최영훈', text: '오늘 PT 수업 받느라 고생했어요 ㅎㅎ', time: '10:00 am' },
    { sender: 'Me', text: '감사합니다! 다음에 또 뵐게요.', time: '10:05 am' },
  ],
  '2': [
    { sender: '김지혁', text: '채팅방을 나갔습니다.', time: '06:00 pm' },
  ],
  '3': [
    { sender: '최지은', text: '그동안 저희 UT피트니스와 함께해주셔서...', time: '01:00 pm' },
    { sender: 'Me', text: '네, 저도 감사했습니다.', time: '01:05 pm' },
  ],
};

const MessagePost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const initialMessageList = id ? initialMessages[id] || [] : [];
  const [messages, setMessages] = useState<{ sender: string; text: string; time: string; }[]>(initialMessageList);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (newMessage.trim()) {
      const newMsg = { sender: 'Me', text: newMessage, time: 'now' };
      setMessages([...messages, newMsg]);
      setNewMessage('');
    }
  };

  return (
    <div className="message-post">
      <header className="header">
        <button className="back-button" onClick={() => window.history.back()}>←</button>
        <h1>Chat</h1>
      </header>
      <div className="messages-container">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender === 'Me' ? 'me' : 'other'}`}>
            <div className="message-sender">{msg.sender}</div>
            <div className="message-text">{msg.text}</div>
            <div className="message-time">{msg.time}</div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="input-container">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="메세지를 입력하세요..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default MessagePost;
