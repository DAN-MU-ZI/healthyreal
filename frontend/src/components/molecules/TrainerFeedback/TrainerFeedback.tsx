import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './TrainerFeedback.css';
import { PostContext } from '../../../pages/PostContext';

interface LocationState {
  mealTime: string;
  selectedDate: string;
  postToEdit: any;
}

const TrainerFeedback: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const context = React.useContext(PostContext);

  if (!context) {
    throw new Error('PostContext must be used within a PostProvider');
  }

  const { editPost } = context;

  // 기본값 설정
  const state = location.state as LocationState | null;
  const mealTime = state?.mealTime || '알 수 없음';
  const selectedDate = state?.selectedDate || '알 수 없음';
  const postToEdit = state?.postToEdit || { id: null, feedback: '' };

  const [feedback, setFeedback] = useState(postToEdit.feedback || '');

  const handleSaveFeedback = () => {
    if (postToEdit.id === null) {
      console.error('Invalid post ID');
      return;
    }

    const updatedPost = {
      ...postToEdit,
      feedback: feedback,
    };
    editPost(updatedPost.id, updatedPost);
    navigate('/MainFoodTrainer', { state: { updatedPost } });
  };

  if (!state) {
    return <div>Error: Invalid navigation state</div>;
  }

  return (
    <div className="feedback-container">
      <h1>{`${mealTime} 피드백 작성`}</h1>
      <textarea
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        placeholder="피드백을 작성해주세요."
      />
      <button onClick={handleSaveFeedback}>저장</button>
    </div>
  );
};

export default TrainerFeedback;
