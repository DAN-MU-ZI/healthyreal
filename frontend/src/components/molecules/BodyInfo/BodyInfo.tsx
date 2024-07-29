import * as React from "react";
import { useState, useEffect } from "react";
import "./styles.css";

import Button from "../../atoms/Button";
import Text from "../../atoms/Text";

interface BodyInfoProp {
  onDataChange: (bodyInfo: {
    birthYear: string;
    height: string;
    weight: string;
  }) => void;
}

const BodyInfo: React.FC<BodyInfoProp> = ({ onDataChange }) => {
  const [birthYear, setBirthYear] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [weight, setWeight] = useState<string>("");

  useEffect(() => {
    onDataChange({ birthYear, height, weight });
  }, [birthYear, height, weight]);

  return (
    <div className="inputContainer">
      <div className="inputItem">
        <Text color="var(--main-blue)" fontSize="16px" fontWeight="500">
          생년월일
        </Text>
        <input
          type="date"
          value={birthYear}
          onChange={(e) => setBirthYear(e.target.value)}
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
          onChange={(e) => setHeight(e.target.value)}
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
          onChange={(e) => setWeight(e.target.value)}
        />
      </div>
    </div>
  );
};

export default BodyInfo;
