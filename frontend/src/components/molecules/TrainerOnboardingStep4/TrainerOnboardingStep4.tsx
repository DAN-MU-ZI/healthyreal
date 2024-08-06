import * as React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import "./TrainerOnboardingStep4.css";
import Card from "../../atoms/Card";
import { MemberGenderEnum } from "../../../typescript-axios";

interface GenderProp {
  onboardingGender: MemberGenderEnum | undefined;
  onDataChange: (selectedGender: MemberGenderEnum) => void;
}

const TrainerOnboardingStep4: React.FC<GenderProp> = ({ onboardingGender, onDataChange }) => {
  const [selectedGender, setSelectedGender] = useState<MemberGenderEnum | undefined>(onboardingGender);
  const navigate = useNavigate();

  useEffect(() => {
    if (onboardingGender !== selectedGender) {
      setSelectedGender(onboardingGender || MemberGenderEnum.Male);
    }
  }, [onboardingGender, selectedGender]);

  const handleGenderSelect = (gender: MemberGenderEnum) => {
    setSelectedGender(gender);
    onDataChange(gender);
  };

  return (
    <div className="container">
      <button onClick={() => navigate(-1)} className="back-button">←</button>
      <div className="headertos4">
        <h1 className="title">성별이 어떻게 되시나요?</h1>
        <p className="subtitle">당신의 성별을 선택하고 맞춤형 운동과 식단 계획을 시작해 보세요!</p>
      </div>
      <div className="gender-card-container">
        <Card
          onClick={() => handleGenderSelect(MemberGenderEnum.Male)}
          selected={selectedGender === MemberGenderEnum.Male}
        >
          남자
        </Card>
        <Card
          onClick={() => handleGenderSelect(MemberGenderEnum.Female)}
          selected={selectedGender === MemberGenderEnum.Female}
        >
          여자
        </Card>
      </div>
      <button onClick={() => navigate('/TrainerOn4/TrainerOn5')} className="next-button">다음</button>
    </div>
  );
};

export default TrainerOnboardingStep4;
