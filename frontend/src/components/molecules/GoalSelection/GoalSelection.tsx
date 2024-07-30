import * as React from "react";
import { useState } from "react";
import "./styles.css";
import dbData from "../../../db/data.json";

interface GoalSelectionProp {
  onboardingGoals: string[];
  onDataChange: (selectedGoals: string[]) => void;
}

const GoalSelection: React.FC<GoalSelectionProp> = ({ onboardingGoals, onDataChange }) => {
  const [selectedGoals, setSelectedGoals] = useState<string[]>(onboardingGoals);
  const goals = dbData.goals;

  const handleGoalChange = (goal: string) => {
    const newSelection = selectedGoals.includes(goal)
      ? selectedGoals.filter((g) => g !== goal)
      : [...selectedGoals, goal];

    setSelectedGoals(newSelection);
    onDataChange(newSelection);
  };

  React.useEffect(() => {
    if (JSON.stringify(onboardingGoals) !== JSON.stringify(selectedGoals)) {
      setSelectedGoals(onboardingGoals)
    }
  }, [onboardingGoals]);

  return (
    <div className="checkbox-container">
      <div className="checkbox-group">
        {goals.map((goal) => (
          <label
            key={goal.en}
            className={`checkbox-btn ${
              selectedGoals.includes(goal.en) ? "checked" : ""
            }`}
          >
            <input
              type="checkbox"
              value={goal.en}
              checked={selectedGoals.includes(goal.en)}
              onChange={() => handleGoalChange(goal.en)}
            />
            <span>{goal.ko}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default GoalSelection;
