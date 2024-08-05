import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './TrainerOnboardingStep2.css';
import { ProgramContext } from '../../../pages/PostContext';

const TrainerOnboardingStep2: React.FC = () => {
  const navigate = useNavigate();
  const context = useContext(ProgramContext);

  if (!context) {
    throw new Error('ProgramContext must be used within a ProgramProvider');
  }

  const { programs } = context;

  const handleAddProgram = () => {
    navigate('/LectureProgramRegistration');
  };

  return (
    <div className="onboarding-container">
      <div className="header2">
        <button onClick={() => window.history.back()} className="back-button">←</button>
        <h1>대표 프로그램을 등록해주세요</h1>
      </div>
      <p>회원들에게 자신을 소개할 수 있는 대표 강의 한 가지를 등록해주세요.</p>
      <div className="add-program" onClick={handleAddProgram}>
        <div className="plus-icon">+</div>
      </div>
      <div className="program-list">
        {programs.map((program) => (
          <div key={program.id} className="program-item">
            <h2>{program.title}</h2>
            <p>{program.description}</p>
            <div className="keywords">
              {program.keywords.map((keyword, index) => (
                <span key={index} className="keyword">{keyword}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <button onClick={() => navigate('/TrainerOn3')} className="next-button">다음</button>
    </div>
  );
};

export default TrainerOnboardingStep2;
