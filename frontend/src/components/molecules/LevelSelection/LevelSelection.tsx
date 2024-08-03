import * as React from "react";
import {useState, useEffect} from "react";
import "./styles.css";
import {MemberRegisterRequestExerciseLevelEnum} from "../../../typescript-axios";
import LevelCard from "../../atoms/LevelCard";

interface LevelProp {
  onboardingLevel: MemberRegisterRequestExerciseLevelEnum;
  onDataChange: (selectedLevel: MemberRegisterRequestExerciseLevelEnum) => void;
}

const LevelSelection: React.FC<LevelProp> = ({
  onboardingLevel,
  onDataChange,
}) => {
  const [selectedLevel, setSelectedLevel] = useState<
    MemberRegisterRequestExerciseLevelEnum | ""
  >("");

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
    selectedLevel === level ? "var(--main-purple)" : "#fff";

  return (
    <div className="levelSelectionContainer">
      <LevelCard
        level="초보자"
        detail="운동을 처음 시작하거나 경험이 적은 분을 위한 계획입니다. 적절한 강도로 기초부터 시작해 보세요."
        onClick={() =>
          handleLevelSelect(MemberRegisterRequestExerciseLevelEnum.Beginner)
        }
        backgroundColor={getButtonColor(
          MemberRegisterRequestExerciseLevelEnum.Beginner
        )}
      />
      <LevelCard
        level="중급자"
        detail="기본적인 운동 경험이 있는 분을 위한 계획입니다. 좀 더 도전적인 루틴으로 나아가 보세요."
        onClick={() =>
          handleLevelSelect(MemberRegisterRequestExerciseLevelEnum.Intermediate)
        }
        backgroundColor={getButtonColor(
          MemberRegisterRequestExerciseLevelEnum.Intermediate
        )}
      />
      <LevelCard
        level="고급자"
        detail="고난도 운동과 경험이 많은 분을 위한 계획입니다. 더 높은 목표를 향해 나아가 보세요."
        onClick={() =>
          handleLevelSelect(MemberRegisterRequestExerciseLevelEnum.Advanced)
        }
        backgroundColor={getButtonColor(
          MemberRegisterRequestExerciseLevelEnum.Advanced
        )}
      />
    </div>
  );
};

export default LevelSelection;
