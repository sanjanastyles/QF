import React, { useState } from 'react';
import { CommentOutlined, CustomerServiceOutlined } from '@ant-design/icons';
import { FloatButton, Input, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import ChatBox from './chatBox';
const ChatBubble = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [showChatBox, setShowChatBox] = useState(false); 
  const handleChatClick = () => {
    setShowChatBox(!showChatBox); 
  };
  const handleSend = () => {
    if (message.trim() !== '') {
      setMessages([...messages, { text: message, sender: 'user' }]);
      setMessage('');
    }
  };
  return (
    <>
      <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 999 }}>
        <FloatButton.Group trigger="hover" type="primary" icon={<CustomerServiceOutlined />}>
          <FloatButton onClick={() => navigate('/contact-us')} />
          <FloatButton icon={<CommentOutlined />} onClick={handleChatClick} />
        </FloatButton.Group>
        {showChatBox && (
          <ChatBox />
        )}
      </div>
    </>
  );
};
export default ChatBubble;