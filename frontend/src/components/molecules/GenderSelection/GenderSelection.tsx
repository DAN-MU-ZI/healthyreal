import * as React from "react";
import { useState, useEffect } from "react";
import "./styles.css";
import Card from "../../atoms/Card";
import { MemberGenderEnum } from "../../../typescript-axios";

interface GenderProp {
  onboardingGender: MemberGenderEnum | undefined;
  onDataChange: (selectedGender: MemberGenderEnum) => void;
}

const GenderSelection: React.FC<GenderProp> = ({ onboardingGender, onDataChange }) => {
  const [selectedGender, setSelectedGender] = useState<MemberGenderEnum | undefined>(onboardingGender);

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
    <div className="genderCardContainer">
      <Card
        onClick={() => handleGenderSelect(MemberGenderEnum.Male)}
        selected={selectedGender === MemberGenderEnum.Male}
      >
        남성
      </Card>
      <Card
        onClick={() => handleGenderSelect(MemberGenderEnum.Female)}
        selected={selectedGender === MemberGenderEnum.Female}
      >
        여성
      </Card>
    </div>
  );
};

export default GenderSelection;
