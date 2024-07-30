import * as React from "react";
import {useState} from "react";
import "./styles.css";
import Button from "../../atoms/Button";

interface LevelProp {
  onboardingLevel: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
  onDataChange: (selectedGoals: string) => void;
}

const LevelSelection: React.FC<LevelProp> = ({
  onboardingLevel,
  onDataChange,
}) => {
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

  const getButtonColor = (level: string) =>
    selectedLevel === level ? "#28a745" : "var(--main-blue)";

  return (
    <>
      <Button
        backgroundColor={getButtonColor("BEGINNER")}
        width="var(--btn-medium)"
        onClick={() => handleLevelSelect("BEGINNER")}
      >
        초급자
      </Button>
      <Button
        backgroundColor={getButtonColor("INTERMEDIATE")}
        width="var(--btn-medium)"
        onClick={() => handleLevelSelect("INTERMEDIATE")}
      >
        중급자
      </Button>
      <Button
        backgroundColor={getButtonColor("ADVANCED")}
        width="var(--btn-medium)"
        onClick={() => handleLevelSelect("ADVANCED")}
      >
        고급자
      </Button>
    </>
  );
};

export default LevelSelection;
