import * as React from "react";
import { useState, useEffect } from "react";
import "./styles.css";

import Text from "../../atoms/Text";
import { BodyInfoDto } from "../../../typescript-axios";

interface BodyInfoProp {
  onboardingBodyInfo: BodyInfoDto;
  onDataChange: (bodyInfo: BodyInfoDto) => void;
}

const BodyInfo: React.FC<BodyInfoProp> = ({ onboardingBodyInfo, onDataChange }) => {
  const [birthDate, setBirthDate] = useState<string>(onboardingBodyInfo.birthDate || "");
  const [height, setHeight] = useState<number>(onboardingBodyInfo.height || 0);
  const [weight, setWeight] = useState<number>(onboardingBodyInfo.weight || 0);
  const [heightError, setHeightError] = useState<string>("");
  const [weightError, setWeightError] = useState<string>("");

  useEffect(() => {
    onDataChange({ birthDate, height, weight });
  }, [birthDate, height, weight]);

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numericValue = parseFloat(value);
    if (!isNaN(numericValue) && numericValue > 0) {
      setHeight(numericValue);
      setHeightError("");
    } else {
      setHeightError("유효한 키를 입력하세요.");
    }
  };

  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numericValue = parseFloat(value);
    if (!isNaN(numericValue) && numericValue > 0) {
      setWeight(numericValue);
      setWeightError("");
    } else {
      setWeightError("유효한 몸무게를 입력하세요.");
    }
  };

  return (
    <div className="inputContainer">
      <div className="inputItem">
        <Text color="var(--main-blue)" fontSize="16px" fontWeight="500">
          생년월일
        </Text>
        <input
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          pattern="\d{4}-\d{2}-\d{2}"
        />
      </div>
      <div className="inputItem">
        <Text color="var(--main-blue)" fontSize="16px" fontWeight="500">
          키
        </Text>
        <input
          type="text"
          placeholder="cm"
          value={height}
          onChange={handleHeightChange}
        />
        {heightError && <span className="error">{heightError}</span>}
      </div>
      <div className="inputItem">
        <Text color="var(--main-blue)" fontSize="16px" fontWeight="500">
          몸무게
        </Text>
        <input
          type="text"
          placeholder="kg"
          value={weight}
          onChange={handleWeightChange}
        />
        {weightError && <span className="error">{weightError}</span>}
      </div>
    </div>
  );
};

export default BodyInfo;
