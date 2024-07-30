import * as React from "react";
import { useState, useEffect } from "react";
import "./styles.css";
import Card from "../../atoms/Card";
import { UserInfoGenderEnum } from "../../../typescript-axios";

interface GenderProp {
  onboardingGender: UserInfoGenderEnum | undefined;
  onDataChange: (selectedGender: UserInfoGenderEnum) => void;
}

const GenderSelection: React.FC<GenderProp> = ({ onboardingGender, onDataChange }) => {
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
    </div>
  );
};

export default GenderSelection;
