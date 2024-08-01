import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TrainerOnboardingStep3.css';

const TrainerOnboardingStep3: React.FC = () => {
  const navigate = useNavigate();
  const [certificate, setCertificate] = useState('');
  const [certificateImage, setCertificateImage] = useState<File | null>(null);
  const [awards, setAwards] = useState('');
  const [experience, setExperience] = useState('');

  const handleCertificateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCertificate(event.target.value);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setCertificateImage(event.target.files[0]);
    }
  };

  const handleNext = () => {
    // 폼 데이터 저장 및 다음 페이지로 이동
    navigate('/next-step');
  };

  return (
    <div className="onboarding-container">
      <div className="header">
        <button onClick={() => window.history.back()} className="back-button">←</button>
        <h1>자격 사항을 등록해주세요</h1>
        <p>회원들에게 자격을 증명할 수 있도록 소지 자격증, 피트니스 대회 수상 경력, 트레이너 센터 근무 경력을 등록해주세요.</p>
      </div>
      <div className="form-container">
        <div className="form-group">
          <label htmlFor="certificate">소지 자격증</label>
          <select id="certificate" value={certificate} onChange={handleCertificateChange}>
            <option value="">선택하세요</option>
            <option value="ACSM-CPT">ACSM-CPT</option>
            <option value="ACSM-CES">ACSM-CES</option>
            <option value="ACSM-HFI">ACSM-HFI</option>
            <option value="ACSM-RCEP">ACSM-RCEP</option>
            <option value="NSCA-CPT">NSCA-CPT</option>
            <option value="NSCA-CSCS">NSCA-CSCS</option>
            <option value="NSCA-CSPS">NSCA-CSPS</option>
            <option value="NASM-CPT">NASM-CPT</option>
            <option value="NASM-CES">NASM-CES</option>
            <option value="NASM-PES">NASM-PES</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="certificateImage">자격증 사진을 첨부해주세요</label>
          <input type="file" id="certificateImage" accept="image/*" onChange={handleImageUpload} />
        </div>
        <div className="form-group">
          <label htmlFor="awards">수상 경력</label>
          <input
            type="number"
            id="awards"
            value={awards}
            onChange={(e) => setAwards(e.target.value)}
            placeholder="수상 경력 횟수를 입력하세요"
          />
        </div>
        <div className="form-group">
          <label htmlFor="experience">트레이너 센터 근무 경력</label>
          <input
            type="number"
            id="experience"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            placeholder="근무 경력을 년 단위로 입력하세요"
          />
        </div>
        <button onClick={() => navigate('TrainerOn4')} className="next-button">다음</button>
      </div>
    </div>
  );
};

export default TrainerOnboardingStep3;
