import * as React from "react";
import { useState, useEffect } from "react";
import "./styles.css";
import { GoalGoalTypeEnum, GoalGoalTypeEnum as GoalEnum } from "../../../typescript-axios";

interface GoalSelectionProp {
  onboardingGoals: GoalGoalTypeEnum[];
  onDataChange: (selectedGoals: GoalGoalTypeEnum[]) => void;
}

const GoalSelection: React.FC<GoalSelectionProp> = ({ onboardingGoals, onDataChange }) => {
  const [selectedGoals, setSelectedGoals] = useState<GoalGoalTypeEnum[]>(onboardingGoals);

  const goalLabels: { [key in GoalGoalTypeEnum]: string } = {
    [GoalEnum.WeightLoss]: '체중 감량',
    [GoalEnum.MuscleGain]: '근육 증가',
    [GoalEnum.StaminaImprovement]: '지구력 향상',
    [GoalEnum.FlexibilityImprovement]: '유연성 향상',
    [GoalEnum.BodyShapeImprovement]: '체형 개선',
    [GoalEnum.BalanceImprovement]: '균형 개선',
    [GoalEnum.LifestyleImprovement]: '생활습관 개선',
    [GoalEnum.HealthImprovement]: '건강 증진',
    [GoalEnum.BodyProfile]: '바디 프로필',
    [GoalEnum.Other]: '기타',
  };

  const handleGoalChange = (goal: GoalGoalTypeEnum) => {
    const newSelection = selectedGoals.includes(goal)
      ? selectedGoals.filter((g) => g !== goal)
      : [...selectedGoals, goal];

    setSelectedGoals(newSelection);
    onDataChange(newSelection);
  };

  useEffect(() => {
    if (JSON.stringify(onboardingGoals) !== JSON.stringify(selectedGoals)) {
      setSelectedGoals(onboardingGoals);
    }
  }, [onboardingGoals]);

  return (
    <div className="checkbox-container">
      <div className="checkbox-group">
        {Object.values(GoalGoalTypeEnum).map((goal) => (
          <label
            key={goal}
            className={`checkbox-btn ${selectedGoals.includes(goal) ? "checked" : ""}`}
          >
            <input
              type="checkbox"
              value={goal}
              checked={selectedGoals.includes(goal)}
              onChange={() => handleGoalChange(goal)}
            />
            <span>{goalLabels[goal]}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default GoalSelection;
