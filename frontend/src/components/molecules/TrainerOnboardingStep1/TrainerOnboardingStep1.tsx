import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TrainerOnboardingStep1.css';

const specializations = ['바디 프로필', '근력 증가', '선수 트레이닝', '재활 트레이닝', '통증 케어', '식단 관리', '다이어트 및 체중 관리', '벌크업', '자세 교정'];

const TrainerOnboardingStep1: React.FC = () => {
  const navigate = useNavigate();
  const [selectedSpecializations, setSelectedSpecializations] = useState<string[]>([]);
  const [customSpecialization, setCustomSpecialization] = useState('');

  const handleSpecializationClick = (specialization: string) => {
    if (selectedSpecializations.includes(specialization)) {
      setSelectedSpecializations(selectedSpecializations.filter(item => item !== specialization));
    } else if (selectedSpecializations.length < 3) {
      setSelectedSpecializations([...selectedSpecializations, specialization]);
    }
  };

  const handleCustomSpecializationAdd = () => {
    if (customSpecialization && selectedSpecializations.length < 3) {
      setSelectedSpecializations([...selectedSpecializations, customSpecialization]);
      setCustomSpecialization('');
    }
  };

  const handleNext = () => {
    navigate('/trainer-onboarding-step2');
  };

  return (
    <div className="container">
      <div className="headertos1">
        <button onClick={() => window.history.back()} className="back-button">←</button>
        <h1>전문 분야</h1>
      </div>
      <p>본인이 자신 있는 분야를 선택해 주세요.</p>
      <p>*최대 3개 선택 가능</p>
      <div className="specializations">
        {specializations.map((specialization) => (
          <button
            key={specialization}
            className={`specialization-button ${selectedSpecializations.includes(specialization) ? 'selected' : ''}`}
            onClick={() => handleSpecializationClick(specialization)}
          >
            {specialization}
          </button>
        ))}
        <div className="custom-specialization">
          <input
            type="text"
            placeholder="직접 입력"
            value={customSpecialization}
            onChange={(e) => setCustomSpecialization(e.target.value)}
          />
          <button onClick={handleCustomSpecializationAdd}>+</button>
        </div>
      </div>
      <button onClick={() => navigate('/TrainerOn2')} className="next-button">다음</button>
    </div>
  );
};

export default TrainerOnboardingStep1;
