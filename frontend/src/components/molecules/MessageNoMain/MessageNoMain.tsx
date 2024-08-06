import React from 'react';
import './MessageNoMain.css';
import NoMessage from '../../../assets/images/NoMessage.png'


const MessageNoMain: React.FC = () => {
  return (
    <div className="message-no-main">
      <h1>Messages</h1>
      <div className="no-messages-container">
        <p>수신된 메세지가 없습니다</p>
        <img src={NoMessage} alt="No Messages" className="no-messages-image" />
      </div>
    </div>
  );
};

export default MessageNoMain;
