import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TrainerOnboardingStep1.css';

const TrainerOnboardingStep1: React.FC = () => {
  const navigate = useNavigate();
  const [selectedFields, setSelectedFields] = useState<string[]>([]);
  const [customField, setCustomField] = useState('');

  const toggleField = (field: string) => {
    if (selectedFields.includes(field)) {
      setSelectedFields(selectedFields.filter((item) => item !== field));
    } else if (selectedFields.length < 3) {
      setSelectedFields([...selectedFields, field]);
    }
  };

  const addCustomField = () => {
    if (customField && !selectedFields.includes(customField) && selectedFields.length < 3) {
      setSelectedFields([...selectedFields, customField]);
      setCustomField('');
    }
  };

  return (
    <div className="onboarding-container">
      <div className="header">
        <button onClick={() => window.history.back()} className="back-button">←</button>
        <h1>전문 분야</h1>
        <p>본인이 자신 있는 분야를 선택해 주세요.</p>
      </div>
      <div className="form-container">
        <p>*최대 3개 선택 가능</p>
        <div className="fields">
          {['바디 프로필', '근력 증가', '선수 트레이닝', '재활 트레이닝', '통증 케어', '식단 관리', '다이어트 및 체중 관리', '벌크업', '자세 교정'].map((field) => (
            <button
              key={field}
              onClick={() => toggleField(field)}
              className={`field-button ${selectedFields.includes(field) ? 'selected' : ''}`}
            >
              {field}
            </button>
          ))}
          <div className="custom-field-container">
            <input
              type="text"
              value={customField}
              onChange={(e) => setCustomField(e.target.value)}
              placeholder="직접 입력"
            />
            <button onClick={addCustomField} className="add-button">+</button>
          </div>
        </div>
        <button onClick={() => navigate('/TrainerOn2')} className="next-button">다음</button>
      </div>
    </div>
  );
};

export default TrainerOnboardingStep1;
