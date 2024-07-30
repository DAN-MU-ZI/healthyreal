import * as React from "react";
import {useState, useEffect} from "react";
import "./styles.css";

import Button from "../../atoms/Button";
import Text from "../../atoms/Text";

interface BodyInfoProp {
  onboardingBodyInfo: {birthDate: string; height: number; weight: number};
  onDataChange: (bodyInfoDto: {
    birthDate: string;
    height: number;
    weight: number;
  }) => void;
}

const BodyInfo: React.FC<BodyInfoProp> = ({
  onboardingBodyInfo,
  onDataChange,
}) => {
  const [birthDate, setBirthDate] = useState<string>(
    onboardingBodyInfo.birthDate
  );
  const [height, setHeight] = useState<number>(onboardingBodyInfo.height);
  const [weight, setWeight] = useState<number>(onboardingBodyInfo.weight);

  useEffect(() => {
    onDataChange({birthDate, height, weight});
  }, [birthDate, height, weight]);

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numericValue = parseFloat(value);
    if (!isNaN(numericValue)) {
      setHeight(numericValue);
    } else {
      setHeight(0); // Or some other fallback
    }
  };

  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numericValue = parseFloat(value);
    if (!isNaN(numericValue)) {
      setWeight(numericValue);
    } else {
      setWeight(0); // Or some other fallback
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
      </div>
    </div>
  );
};

export default BodyInfo;
