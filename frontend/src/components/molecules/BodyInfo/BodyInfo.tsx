import * as React from "react";
import { useState, useEffect } from "react";
import "./styles.css";

import Button from "../../atoms/Button";

interface BodyInfoProp {
  bodyInfo: {
    birthYear: string;
    height: number;
    weight: number;
  };
  onDataChange: (bodyInfo: {
    birthYear: string;
    height: number;
    weight: number;
  }) => void;
}

const BodyInfo: React.FC<BodyInfoProp> = ({ bodyInfo, onDataChange }) => {
  const [birthYear, setBirthYear] = useState<string>(bodyInfo.birthYear);
  const [height, setHeight] = useState<number>(bodyInfo.height);
  const [weight, setWeight] = useState<number>(bodyInfo.weight);

  useEffect(() => {
    const hasChanges =
      birthYear !== bodyInfo.birthYear ||
      height !== bodyInfo.height ||
      weight !== bodyInfo.weight;

    if (hasChanges) {
      onDataChange({ birthYear, height, weight });
    }
  }, [birthYear, height, weight, bodyInfo]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBirthYear(e.target.value);
  };

  const handleNumberChange = (setter: React.Dispatch<React.SetStateAction<number>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setter(isNaN(value) ? 0 : value);
  };

  return (
    <>
      <input
        type="date"
        placeholder="출생연도"
        value={birthYear}
        onChange={handleDateChange}
      />
      <input
        type="number"
        placeholder="키 (cm)"
        value={height}
        onChange={handleNumberChange(setHeight)}
        min="0"
      />
      <input
        type="number"
        placeholder="몸무게 (kg)"
        value={weight}
        onChange={handleNumberChange(setWeight)}
        min="0"
      />
    </>
  );
};

export default BodyInfo;
