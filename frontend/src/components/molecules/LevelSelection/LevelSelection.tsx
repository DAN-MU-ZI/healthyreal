import * as React from "react";
import { useState, useEffect } from "react";
import "./styles.css";
import Button from "../../atoms/Button";
import { MemberRegisterRequestExerciseLevelEnum } from "../../../typescript-axios";

interface LevelProp {
  onboardingLevel: MemberRegisterRequestExerciseLevelEnum;
  onDataChange: (selectedLevel: MemberRegisterRequestExerciseLevelEnum) => void;
}

const LevelSelection: React.FC<LevelProp> = ({ onboardingLevel, onDataChange }) => {
  const [selectedLevel, setSelectedLevel] = useState<MemberRegisterRequestExerciseLevelEnum | "">("");

  useEffect(() => {
    if (onboardingLevel !== selectedLevel) {
      setSelectedLevel(onboardingLevel || "");
    }
  }, [onboardingLevel, selectedLevel]);

  const handleLevelSelect = (level: MemberRegisterRequestExerciseLevelEnum) => {
    setSelectedLevel(level);
    onDataChange(level);
  };

  const getButtonColor = (level: MemberRegisterRequestExerciseLevelEnum) =>
    selectedLevel === level ? "#28a745" : "var(--main-blue)";

  return (
    <div className="levelSelectionContainer">
      <Button
        backgroundColor={getButtonColor(MemberRegisterRequestExerciseLevelEnum.Beginner)}
        width="var(--btn-medium)"
        onClick={() => handleLevelSelect(MemberRegisterRequestExerciseLevelEnum.Beginner)}
      >
        초급자
      </Button>
      <Button
        backgroundColor={getButtonColor(MemberRegisterRequestExerciseLevelEnum.Intermediate)}
        width="var(--btn-medium)"
        onClick={() => handleLevelSelect(MemberRegisterRequestExerciseLevelEnum.Intermediate)}
      >
        중급자
      </Button>
      <Button
        backgroundColor={getButtonColor(MemberRegisterRequestExerciseLevelEnum.Advanced)}
        width="var(--btn-medium)"
        onClick={() => handleLevelSelect(MemberRegisterRequestExerciseLevelEnum.Advanced)}
      >
        고급자
      </Button>
    </div>
  );
};

export default LevelSelection;
