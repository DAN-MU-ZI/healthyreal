import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LectureProgramRegistration.css';

const LectureProgramRegistration: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const [image, setImage] = useState<File | null>(null);
  const navigate = useNavigate();

  const keywords = [
    '50대 이상 고객 맞춤 트레이닝',
    '직장인 고객 맞춤 트레이닝',
    '식단 관리 병행',
    '보디 빌딩 대회 준비',
    '단기간 트레이닝',
    '상체 위주 근력 운동',
    '하체 위주 근력 운동',
  ];

  const handleKeywordToggle = (keyword: string) => {
    setSelectedKeywords((prev) =>
      prev.includes(keyword) ? prev.filter((k) => k !== keyword) : [...prev, keyword]
    );
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    const newProgram = {
      title,
      description,
      keywords: selectedKeywords,
      image,
    };
    navigate('/LectureProgramPreview', { state: newProgram });
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
        <div className="keywords">
          {keywords.map((keyword) => (
            <button
              key={keyword}
              type="button"
              className={`keyword-button ${selectedKeywords.includes(keyword) ? 'selected' : ''}`}
              onClick={() => handleKeywordToggle(keyword)}
              disabled={!selectedKeywords.includes(keyword) && selectedKeywords.length >= 3}
            >
              {keyword}
            </button>
          ))}
        </div>
      </div>
      <div className="form-group">
        <label>사진</label>
        <input type="file" accept="image/*" onChange={handleImageChange} />
      </div>
      <button onClick={handleSubmit}>등록하기</button>
    </div>
  );
};

export default LectureProgramRegistration;
