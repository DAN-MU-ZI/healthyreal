import * as React from "react";
import { useState } from "react";
import "./styles.css";
import Button from "../../atoms/Button";
import Card from "../../atoms/Card";
import styled from "styled-components";

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
    <div className="genderCardContainer">
      <Card
        onClick={() => handleGenderSelect("MALE")}
        selected={selectedGender === "MALE"}
      >
        남성
      </Card>
      <Card
        onClick={() => handleGenderSelect("FEMAlE")}
        selected={selectedGender === "FEMAlE"}
      >
        여성
      </Card>
    </div>
  );
};

export default GenderSelection;
