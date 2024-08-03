import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TrainerOnboardingStep4.css';

const TrainerOnboardingStep4: React.FC = () => {
  const navigate = useNavigate();
  const [gender, setGender] = useState<string | null>(null);

  const handleGenderSelect = (selectedGender: string) => {
    setGender(selectedGender);
  };

  const handleNext = () => {
    if (gender) {
      // 성별 정보 저장
      navigate('/next-step');
    } else {
      alert('성별을 선택해주세요.');
    }
  };

  return (
    <div className="onboarding-container">
      <div className="header">
        <button onClick={() => window.history.back()} className="back-button">←</button>
        <h1>성별이 어떻게 되시나요?</h1>
        <p>당신의 성별을 선택하고 맞춤형 운동과 식단 계획을 시작해보세요!</p>
      </div>
      <div className="gender-selection">
        <div 
          className={`gender-option ${gender === 'male' ? 'selected' : ''}`}
          onClick={() => handleGenderSelect('male')}
        >
          <img src="/path/to/male-icon.png" alt="남자" /> {/* 여기에 남자 성별 이미지 경로 */}
          <span>남자</span>
        </div>
        <div 
          className={`gender-option ${gender === 'female' ? 'selected' : ''}`}
          onClick={() => handleGenderSelect('female')}
        >
          <img src="/path/to/female-icon.png" alt="여자" /> {/* 여기에 여자 성별 이미지 경로 */}
          <span>여자</span>
        </div>
      </div>
      <button onClick={() => navigate('TrainerOn5')} className="next-button">다음</button>
    </div>
  );
};

export default TrainerOnboardingStep4;
