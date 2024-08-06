import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TrainerOnboardingStep3.css';

const qualifications = [
  'ACSM-CPT', 'ACSM-CES', 'ACSM-HFI', 'ACSM-RCEP',
  'NSCA-CPT', 'NSCA-CSCS', 'NSCA-CSPS',
  'NASM-CPT', 'NASM-CES', 'NASM-PES'
];

const TrainerOnboardingStep3: React.FC = () => {
  const navigate = useNavigate();
  const [selectedQualification, setSelectedQualification] = useState<string>('');
  const [certificateImage, setCertificateImage] = useState<File | null>(null);
  const [awardCount, setAwardCount] = useState<number | null>(null);
  const [experienceYears, setExperienceYears] = useState<number | null>(null);

  const handleQualificationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedQualification(e.target.value);
  };

  const handleCertificateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCertificateImage(e.target.files[0]);
    }
  };

  const handleAwardCountChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAwardCount(parseInt(e.target.value));
  };

  const handleExperienceYearsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setExperienceYears(parseInt(e.target.value));
  };

  const handleNext = () => {
    // 데이터 저장 로직 추가
    navigate('/trainer-onboarding-step4');
  };

  return (
    <div className="container">
      <div className="headertos3">
        <button onClick={() => window.history.back()} className="back-button">←</button>
        <h1>자격 사항을 등록해주세요</h1>
      </div>
      <p>회원들에게 자격을 증명할 수 있도록 소지 자격증, 피트니스 대회 수상 경력, 트레이너 센터 근무 경력을 등록해주세요.</p>
      <label htmlFor="qualification">소지 자격증</label>
      <select id="qualification" value={selectedQualification} onChange={handleQualificationChange}>
        <option value="" disabled>소지 자격증을 선택해주세요</option>
        {qualifications.map((qualification) => (
          <option key={qualification} value={qualification}>{qualification}</option>
        ))}
      </select>
      <label htmlFor="certificate">자격증 사진을 첨부해주세요</label>
      <input type="file" id="certificate" accept="image/*" onChange={handleCertificateChange} />
      <label htmlFor="award">수상 경력</label>
      <select id="award" value={awardCount || ''} onChange={handleAwardCountChange}>
        <option value="" disabled>수상 경력을 선택해주세요</option>
        {[...Array(11).keys()].map((i) => (
          <option key={i} value={i}>{i}회</option>
        ))}
      </select>
      <label htmlFor="experience">트레이너 센터 근무 경력</label>
      <select id="experience" value={experienceYears || ''} onChange={handleExperienceYearsChange}>
        <option value="" disabled>경력을 선택해주세요</option>
        {[...Array(41).keys()].map((i) => (
          <option key={i} value={i}>{i}년</option>
        ))}
      </select>
      <button onClick={() => navigate('/TrainerOn4')} className="next-button">다음</button>
    </div>
  );
};

export default TrainerOnboardingStep3;
