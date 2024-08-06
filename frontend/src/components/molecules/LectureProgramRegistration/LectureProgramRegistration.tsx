import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LectureProgramRegistration.css';
import KeywordSelector from './KeywordSelector';
import FileInput from './FileInput';

const keywords = [
  '50대 이상 고객 맞춤 트레이닝',
  '직장인 고객 맞춤 트레이닝',
  '식단 관리 병행',
  '보디 빌딩 대회 준비',
  '단기간 트레이닝',
  '상체 위주 근력 운동',
  '하체 위주 근력 운동',
];

const LectureProgramRegistration: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const [image, setImage] = useState<File | null>(null);
  const navigate = useNavigate();

  const handleKeywordChange = (newKeywords: string[]) => {
    setSelectedKeywords(newKeywords);
  };

  const handleImageChange = (file: File | null) => {
    setImage(file);
  };

  const handleSubmit = () => {
    const newProgram = {
      title,
      description,
      keywords: selectedKeywords,
      image,
    };
    // Check if the data is correct
    console.log('Submitting:', newProgram);
    navigate('/LectureProgramPreview', { state: { program: newProgram } });
  };

  return (
    <div className="lecture-program-registration">
      <h1>강의 프로그램 등록</h1>
      <div className="form-group">
        <label>제목</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div className="form-group">
        <label>설명</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <div className="form-group">
        <label>관련 키워드 (최대 3개)</label>
        <KeywordSelector
          keywords={keywords}
          selectedKeywords={selectedKeywords}
          onKeywordChange={handleKeywordChange}
        />
      </div>
      <div className="form-group">
        <label>사진</label>
        <FileInput onFileChange={handleImageChange} />
      </div>
      <button onClick={() => navigate('/TrainerOn3')} className="next-button">다음</button>
    </div>
  );
};

export default LectureProgramRegistration;
