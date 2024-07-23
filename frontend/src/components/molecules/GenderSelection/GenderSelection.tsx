import * as React from "react";
import {useState} from "react";
import "./styles.css";
import Button from "../../atoms/Button";

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
    <>
      <Button
        backgroundColor="var(--main-blue)"
        width="var(--btn-medium)"
        onClick={() => handleGenderSelect("MALE")}
      >
        남성
      </Button>
      <Button
        backgroundColor="var(--main-blue)"
        width="var(--btn-medium)"
        onClick={() => handleGenderSelect("FEMAlE")}
      >
        여성
      </Button>
    </>
  );
};

export default GenderSelection;
