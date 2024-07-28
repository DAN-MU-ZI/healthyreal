import * as React from "react";
import { useState } from "react";
import "./styles.css";
import Button from "../../atoms/Button";

interface GenderProp {
  onboardingGender: "MALE" | "FEMALE";
  onDataChange: (selectedGoals: string) => void;
}

const GenderSelection: React.FC<GenderProp> = ({ onboardingGender, onDataChange }) => {
  const [selectedGender, setSelectedGender] = useState<string>(onboardingGender);


  React.useEffect(() => {
    if (onboardingGender !== selectedGender) {
      setSelectedGender(onboardingGender || "");
    }
  }, [onboardingGender, selectedGender]);

  const handleGenderSelect = (gender: string) => {
    setSelectedGender(gender);
    onDataChange(gender);
  };

  const getButtonColor = (gender: string) => (
    selectedGender === gender ? "#28a745" : "var(--main-blue)"
  );

  return (
    <>
      <Button
        backgroundColor={getButtonColor("MALE")}
        width="var(--btn-medium)"
        onClick={() => handleGenderSelect("MALE")}
      >
        남성
      </Button >
      <Button
        backgroundColor={getButtonColor("FEMALE")}
        width="var(--btn-medium)"
        onClick={() => handleGenderSelect("FEMALE")}
      >
        여성
      </Button >
    </>
  );
};

export default GenderSelection;
