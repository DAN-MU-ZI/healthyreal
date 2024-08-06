import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TrainerOnboardingStep5.css';

const daysOfWeek = ['월', '화', '수', '목', '금', '토', '일'];

const TrainerOnboardingStep5: React.FC = () => {
  const navigate = useNavigate();
  const [schedule, setSchedule] = useState<Record<string, { start: string; end: string }>>({});

  const handleTimeChange = (day: string, type: 'start' | 'end', value: string) => {
    setSchedule({
      ...schedule,
      [day]: {
        ...schedule[day],
        [type]: value,
      },
    });
  };

  const handleNext = () => {
    // 데이터 저장 로직 추가
    navigate('/trainer-onboarding-complete');
  };

  return (
    <div className="container">
      <div className="headertos5">
        <button onClick={() => window.history.back()} className="back-button">←</button>
        <h1>강의 일정을 등록해주세요</h1>
      </div>
      <p>회원들이 강의를 예약할 수 있도록 가능한 일정을 등록해주세요.</p>
      <div className="schedule">
        {daysOfWeek.map((day) => (
          <div key={day} className="day">
            <h3>{day}</h3>
            <div className="time">
              <label htmlFor={`${day}-start`}>시작 시간</label>
              <input
                type="time"
                id={`${day}-start`}
                value={schedule[day]?.start || ''}
                onChange={(e) => handleTimeChange(day, 'start', e.target.value)}
              />
            </div>
            <div className="time">
              <label htmlFor={`${day}-end`}>종료 시간</label>
              <input
                type="time"
                id={`${day}-end`}
                value={schedule[day]?.end || ''}
                onChange={(e) => handleTimeChange(day, 'end', e.target.value)}
              />
            </div>
          </div>
        ))}
      </div>
      <button className="next-button" onClick={handleNext}>완료</button>
    </div>
  );
};

export default TrainerOnboardingStep5;
