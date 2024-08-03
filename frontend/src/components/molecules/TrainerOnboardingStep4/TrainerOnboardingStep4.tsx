import * as React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import "./TrainerOnboardingStep4.css";
import Card from "../../atoms/Card"; // Card 컴포넌트가 이 경로에 있는지 확인하세요
import { UserInfoGenderEnum } from "../../../typescript-axios"; // UserInfoGenderEnum이 이 경로에 있는지 확인하세요

interface GenderProp {
  onboardingGender: UserInfoGenderEnum | undefined;
  onDataChange: (selectedGender: UserInfoGenderEnum) => void;
}

const TrainerOnboardingStep4: React.FC<GenderProp> = ({ onboardingGender, onDataChange }) => {
  const navigate = useNavigate();
  const [selectedGender, setSelectedGender] = useState<UserInfoGenderEnum | undefined>(onboardingGender);

  useEffect(() => {
    if (onboardingGender !== selectedGender) {
      setSelectedGender(onboardingGender || UserInfoGenderEnum.Male);
    }
  }, [onboardingGender, selectedGender]);

  const handleGenderSelect = (gender: UserInfoGenderEnum) => {
    setSelectedGender(gender);
    onDataChange(gender);
  };

  return (
    <div className="genderCardContainer">
      <Card
        onClick={() => handleGenderSelect(UserInfoGenderEnum.Male)}
        selected={selectedGender === UserInfoGenderEnum.Male}
      >
        남성
      </Card>
      <Card
        onClick={() => handleGenderSelect(UserInfoGenderEnum.Female)}
        selected={selectedGender === UserInfoGenderEnum.Female}
      >
        여성
      </Card>
      <button onClick={() => navigate('/TrainerOn4/TrainerOn5')} className="next-button">다음</button>
    </div>
  );
};

export default TrainerOnboardingStep4;
