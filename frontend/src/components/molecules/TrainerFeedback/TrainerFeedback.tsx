import React, { useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './TrainerFeedback.css';
import { PostContext } from '../../../pages/PostContext';

const TrainerFeedback: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const context = useContext(PostContext);
  
  if (!context) {
    throw new Error('PostContext must be used within a PostProvider');
  }
  
  const { addFeedback } = context;
  const state = location.state as { postToEdit?: any } || {};
  const { postToEdit } = state;
  
  const [feedback, setFeedback] = useState('');

  const handleSubmit = () => {
    if (postToEdit) {
      const updatedPost = {
        ...postToEdit,
        feedback: [...(postToEdit.feedback || []), feedback],
      };
      addFeedback(updatedPost.id, updatedPost);
      navigate('/MypageFood', { state: { updatedPost } });
    }
  };

  return (
    <div className="feedback-container">
      <div className="feedback-header">
        <button onClick={() => navigate(-1)} className="back-button">←</button>
        <h1>피드백 작성</h1>
      </div>
      <div className="feedback-form">
        <textarea
          placeholder="피드백을 입력하세요"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />
        <button onClick={handleSubmit} className="submit-button">제출</button>
      </div>
    </div>
  );
};

export default TrainerFeedback;
