import React from 'react';
import { Link } from 'react-router-dom';
import './MessageMain.css';

interface Message {
  id: string;
  sender: string;
  text: string;
  time: string;
  unreadCount: number;
}

const messages: Message[] = [
  { id: '1', sender: '최영훈', text: '오늘 PT 수업 받느라 고생했어요 ㅎㅎ', time: '5m ago', unreadCount: 2 },
  { id: '2', sender: '김지혁', text: '채팅방을 나갔습니다.', time: '06:00 pm', unreadCount: 0 },
  { id: '3', sender: '최지은', text: '그동안 저희 UT피트니스와 함께해주셔서...', time: '01:00 pm', unreadCount: 1 },
];

const MessageMain: React.FC = () => {
  return (
    <div className="message-main">
      <h1>Messages</h1>
      <div className="messages-list">
        {messages.map((message) => (
          <Link to={`/message/${message.id}`} key={message.id} className="message-item">
            <div className="message-sender">{message.sender}</div>
            <div className="message-text">{message.text}</div>
            <div className="message-time">{message.time}</div>
            {message.unreadCount > 0 && (
              <div className="message-unread-count">{message.unreadCount}</div>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MessageMain;
