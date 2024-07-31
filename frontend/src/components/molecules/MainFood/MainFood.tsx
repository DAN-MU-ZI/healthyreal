import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './MainFood.css';
import { PostContext } from '../../../pages/PostContext';

const MainFood: React.FC = () => {
  const navigate = useNavigate();
  const context = useContext(PostContext);

  if (!context) {
    throw new Error('PostContext must be used within a PostProvider');
  }

  const { posts } = context;
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const formattedDate = selectedDate.toISOString().split('T')[0]; // Format: yyyy-mm-dd

  const mealStatus = (mealTime: string) => {
    return posts.some(post => post.date.startsWith(formattedDate) && post.date.includes(mealTime)) ? '완료' : '미작성';
  };

  const handleMealClick = (mealTime: string) => {
    navigate('/post-food', { state: { mealTime, selectedDate: formattedDate } });
  };

  return (
    <div className="container">
      <div className="header">
        <button onClick={() => window.history.back()} className="back-button">←</button>
        <h1>식단 관리</h1>
      </div>
      <div className="calendar-container">
        <Calendar onChange={(date) => setSelectedDate(date as Date)} value={selectedDate} />
      </div>
      <div className="selected-date">
        {selectedDate.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'short' })}
      </div>
      <div className="meal-list">
        {['아침', '점심', '저녁'].map(mealTime => (
          <div key={mealTime} className="meal-item" onClick={() => handleMealClick(mealTime)}>
            <span className="meal-time">{mealTime}</span>
            <span className={`meal-status ${mealStatus(mealTime) === '완료' ? 'complete' : 'incomplete'}`}>
              {mealStatus(mealTime)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainFood;
