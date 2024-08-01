import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TrainerOnboardingStep2.css';

const TrainerOnboardingStep2: React.FC = () => {
  const navigate = useNavigate();
  const [videoFile, setVideoFile] = useState<File | null>(null);

  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setVideoFile(event.target.files[0]);
    }
  };

  return (
    <div className="onboarding-container">
      <div className="header">
        <button onClick={() => window.history.back()} className="back-button">←</button>
        <h1>대표 프로그램을 등록해주세요</h1>
        <p>회원들에게 자신을 소개할 수 있는 대표 강의 한 가지를 등록해주세요.</p>
      </div>
      <div className="form-container">
        <div className="video-upload">
          <label htmlFor="video-upload-input" className="upload-label">
            {videoFile ? videoFile.name : <span>+</span>}
          </label>
          <input
            type="file"
            id="video-upload-input"
            accept="video/*"
            onChange={handleVideoUpload}
            style={{ display: 'none' }}
          />
        </div>
        <button onClick={() => navigate('TrainerOn3')} className="next-button">다음</button>
      </div>
    </div>
  );
};

export default TrainerOnboardingStep2;
