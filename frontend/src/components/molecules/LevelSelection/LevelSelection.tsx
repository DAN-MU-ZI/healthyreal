import * as React from "react";
import {useState} from "react";
import "./styles.css";
import Button from "../../atoms/Button";

interface LevelProp {
  onDataChange: (selectedGoals: string) => void;
}

const LevelSelection: React.FC<LevelProp> = ({onDataChange}) => {
  const [selectedLevel, setSelectedLevel] = useState<string>("");

  const handleLevelSelect = (level: string) => {
    setSelectedLevel(level);
    onDataChange(level);
  };

  return (
    <>
      <Button
        backgroundColor="var(--main-blue)"
        width="var(--btn-medium)"
        onClick={() => handleLevelSelect("beginner")}
      >
        초급자
      </Button>
      <Button
        backgroundColor="var(--main-blue)"
        width="var(--btn-medium)"
        onClick={() => handleLevelSelect("intermediate")}
      >
        중급자
      </Button>
      <Button
        backgroundColor="var(--main-blue)"
        width="var(--btn-medium)"
        onClick={() => handleLevelSelect("advanced")}
      >
        고급자
      </Button>
    </>
  );
};

export default LevelSelection;
