import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TrainerOnboardingStep2.css';

const TrainerOnboardingStep2: React.FC = () => {
  const navigate = useNavigate();
  const [video, setVideo] = useState<File | null>(null);

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setVideo(e.target.files[0]);
    }
  };

  const handleNext = () => {
    navigate('/trainer-onboarding-step3');
  };

  return (
    <div className="container">
      <div className="header">
        <button onClick={() => window.history.back()} className="back-button">←</button>
        <h1>대표 프로그램을 등록해주세요</h1>
      </div>
      <p>회원들에게 자신을 소개할 수 있는 대표 강의 한 가지를 등록해주세요.</p>
      <div className="video-upload">
        <input type="file" accept="video/*" onChange={handleVideoChange} id="video-upload-input" />
        <label htmlFor="video-upload-input" className="video-upload-label">
          {video ? video.name : <span>+</span>}
        </label>
      </div>
      <button onClick={() => navigate('/TrainerOn3')} className="next-button">다음</button>
    </div>
  );
};

export default TrainerOnboardingStep2;
