import * as React from "react";
import {useState} from "react";
import "./styles.css";
import Button from "../../atoms/Button";
import Card from "../../atoms/Card";
import styled from "styled-components";

interface GenderProp {
  onDataChange: (selectedGoals: string) => void;
}

const GenderSelection: React.FC<GenderProp> = ({onDataChange}) => {
  const [selectedGender, setSelectedGender] = useState<string>("");

  const handleGenderSelect = (gender: string) => {
    setSelectedGender(gender);
    onDataChange(gender);
  };

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
