import * as React from "react";
import {useState, useEffect} from "react";
import "./styles.css";

import Button from "../../atoms/Button";

interface BodyInfoProp {
  onDataChange: (bodyInfo: {
    birthYear: string;
    height: string;
    weight: string;
  }) => void;
}

const BodyInfo: React.FC<BodyInfoProp> = ({onDataChange}) => {
  const [birthYear, setBirthYear] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [weight, setWeight] = useState<string>("");

  useEffect(() => {
    onDataChange({birthYear, height, weight});
  }, [birthYear, height, weight]);

  return (
    <>
      <input
        type="text"
        placeholder="출생연도"
        value={birthYear}
        onChange={(e) => setBirthYear(e.target.value)}
      />
      <input
        type="text"
        placeholder="키"
        value={height}
        onChange={(e) => setHeight(e.target.value)}
      />
      <input
        type="text"
        placeholder="몸무게"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
      />
    </>
  );
};

export default BodyInfo;
