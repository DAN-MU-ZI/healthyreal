import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './LectureProgramPreview.css';

const LectureProgramPreview: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { title, description, keywords, image } = location.state as {
    title: string;
    description: string;
    keywords: string[];
    image: File | null;
  };

  return (
    <div className="lecture-program-preview">
      <h1>강의 프로그램 미리보기</h1>
      <div className="program-details">
        <h2>{title}</h2>
        <p>{description}</p>
        <div className="keywords">
          {keywords.map((keyword) => (
            <span key={keyword} className="keyword">
              {keyword}
            </span>
          ))}
        </div>
        {image && <img src={URL.createObjectURL(image)} alt="Program" className="program-image" />}
      </div>
      <button onClick={() => navigate('/TrainerOnboardingStep2')}>완료</button>
    </div>
  );
};

export default LectureProgramPreview;
