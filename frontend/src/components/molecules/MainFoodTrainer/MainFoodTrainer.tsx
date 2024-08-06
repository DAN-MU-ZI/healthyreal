import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './MainFoodTrainer.css';
import { PostContext } from '../../../pages/PostContext';

const MainFoodTrainer: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const context = useContext(PostContext);

  if (!context) {
    throw new Error('PostContext must be used within a PostProvider');
  }

  const { posts } = context;
  const [selectedDate, setSelectedDate] = useState<Date>(() => {
    const state = location.state as { selectedDate?: string } | null;
    return state?.selectedDate ? new Date(state.selectedDate) : new Date();
  });

  useEffect(() => {
    if (location.state?.updatedPost) {
      const updatedPost = location.state.updatedPost;
      const exists = posts.some(post => post.id === updatedPost.id);
      if (!exists) {
        context.addPost(updatedPost);
      }
    }
  }, [location.state, context, posts]);

  const formattedDate = selectedDate.toISOString().split('T')[0];

  const mealStatus = (mealTime: string) => {
    return posts.some(post => post.date.startsWith(formattedDate) && post.mealTime === mealTime) ? '작성' : '미작성';
  };

  const handleMealClick = (mealTime: string) => {
    // Navigate to PostFood only if you want to edit a post
    navigate('/PostFood', {
      state: {
        mealTime,
        selectedDate: formattedDate,
        postToEdit: posts.find(post => post.date.startsWith(formattedDate) && post.mealTime === mealTime)
      }
    });
  };

  const handleFeedbackClick = (mealTime: string) => {
    // Navigate to TrainerFeedback
    navigate('/TrainerFeedback', {
      state: {
        mealTime,
        selectedDate: formattedDate,
        postToEdit: posts.find(post => post.date.startsWith(formattedDate) && post.mealTime === mealTime)
      }
    });
  };

  return (
    <div className="containermft">
      <div className="headermf">
        <button onClick={() => navigate(-1)} className="back-button">←</button>
        <h1>식단 관리 (트레이너)</h1>
      </div>
      <div className="calendar-container">
        <Calendar onChange={(date) => setSelectedDate(date as Date)} value={selectedDate} />
      </div>
      <div className="selected-date">
        {selectedDate.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'short' })}
      </div>
      <div className="meal-list">
        {['아침', '점심', '저녁'].map(mealTime => (
          <div key={mealTime} className="meal-item">
            <span className="meal-time">{mealTime}</span>
            <span className={`meal-status ${mealStatus(mealTime) === '작성' ? 'complete' : 'incomplete'}`}>
              {mealStatus(mealTime)}
            </span>
            <button onClick={() => handleMealClick(mealTime)} className="edit-button">식사 기록 수정</button>
            <button onClick={() => handleFeedbackClick(mealTime)} className="feedback-buttonft">피드백 작성하기</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainFoodTrainer;
