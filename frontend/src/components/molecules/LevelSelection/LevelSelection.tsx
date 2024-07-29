import * as React from "react";
import { useState } from "react";
import "./styles.css";
import Button from "../../atoms/Button";

interface LevelProp {
  onboardingLevel: "beginner" | "intermediate" | "advanced";
  onDataChange: (selectedGoals: string) => void;
}

const LevelSelection: React.FC<LevelProp> = ({ onboardingLevel, onDataChange }) => {
  const [selectedLevel, setSelectedLevel] = useState<string>("");

  React.useEffect(() => {
    if (onboardingLevel !== selectedLevel) {
      setSelectedLevel(onboardingLevel || "");
    }
  }, [onboardingLevel, selectedLevel]);

  const handleLevelSelect = (level: string) => {
    setSelectedLevel(level);
    onDataChange(level);
  };

  const getButtonColor = (level: string) => (
    selectedLevel === level ? "#28a745" : "var(--main-blue)"
  );

  return (
    <>
      <Button
        backgroundColor={getButtonColor("beginner")}
        width="var(--btn-medium)"
        onClick={() => handleLevelSelect("beginner")}
      >
        초급자
      </Button>
      <Button
        backgroundColor={getButtonColor("intermediate")}
        width="var(--btn-medium)"
        onClick={() => handleLevelSelect("intermediate")}
      >
        중급자
      </Button>
      <Button
        backgroundColor={getButtonColor("advanced")}
        width="var(--btn-medium)"
        onClick={() => handleLevelSelect("advanced")}
      >
        고급자
      </Button>
    </>
  );
};

export default LevelSelection;
