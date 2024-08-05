import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './LectureProgramPreview.css';

interface Program {
  title: string;
  description: string;
  keywords: string[];
  image: File | null;
}

const LectureProgramPreview: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const program = location.state?.program as Program;

  // Debugging: Log the program to verify data is passed correctly
  console.log('Preview Data:', program);

  if (!program) {
    return <p>데이터가 없습니다.</p>;
  }

  const { title, description, keywords, image } = program;

  return (
    <div className="lecture-program-preview">
      <div className="header2">
        <button onClick={() => navigate('/TrainerOnboardingStep2')} className="back-button">←</button>
        <h1>강의 프로그램 미리보기</h1>
      </div>
      <div className="program-details">
        <div className="detail">
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        <div className="keywords">
          {keywords.map((keyword, index) => (
            <span key={index} className="keyword">{keyword}</span>
          ))}
        </div>
        {image && (
          <div className="image-preview">
            <img src={URL.createObjectURL(image)} alt="강의 이미지" />
          </div>
        )}
      </div>
      <button onClick={() => navigate('/TrainerOnboardingStep2')} className="edit-button">수정하기</button>
      <button onClick={() => navigate('/TrainerOn3')} className="next-button">다음</button>
    </div>
  );
};

export default LectureProgramPreview;
