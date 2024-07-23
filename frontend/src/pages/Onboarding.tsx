import * as React from "react";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import OnboardLayout from "../components/templates/OnboardLayout";
import Text from "../components/atoms/Text";
import Button from "../components/atoms/Button";
import testPicture from "../assets/images/testPicture.png";
import dbData from "../db/data.json";
import GoalSelection from "../components/molecules/GoalSelection";
import GenderSelection from "../components/molecules/GenderSelection";
import BodyInfo from "../components/molecules/BodyInfo";
import LevelSelection from "../components/molecules/LevelSelection";

export default function Onboarding() {
  let navigate = useNavigate();
  const [title, setTitle] = useState("null");
  const [detail, setDetail] = useState("null");
  const [onboardingData, setOnboaringData] = useState<any>({
    goals: [],
    gender: "",
    bodyInfo: {birthYear: "", height: "", weight: ""},
    level: "",
    place: "",
  });
  const [step, setStep] = useState<number>(1);

  const titles = dbData.titles;

  const handleDataChange = (key: string, data: any) => {
    setOnboaringData({...onboardingData, [key]: data});
  };

  const handleNext = () => {
    setStep(step + 1);
    console.log(onboardingData);
  };

  const endOnboarding = () => {
    navigate(`/intro/tutorial`);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <GoalSelection
            onDataChange={(data) => handleDataChange("goals", data)}
          />
        );
      case 2:
        return (
          <GenderSelection
            onDataChange={(data) => handleDataChange("gender", data)}
          />
        );
      case 3:
        return (
          <BodyInfo
            onDataChange={(data) => handleDataChange("bodyInfo", data)}
          />
        );
      case 4:
        return (
          <Button
            onClick={() => handleDataChange("place", "아무개")}
            backgroundColor="var(--main-blue)"
          >
            헬스장
          </Button>
        );
      case 5:
        return (
          <LevelSelection
            onDataChange={(data) => handleDataChange("level", data)}
          />
        );
      default:
        return console.log("end onboarding!");
    }
  };

  return (
    <div className="divTag">
      <OnboardLayout
        header="back"
        title={
          <>
            <Text color="var(--main-blue)" fontSize="30px" fontWeight="600">
              {titles[step - 1].title}
            </Text>
            <Text color="var(--sub-blue)" fontSize="12px" fontWeight="400">
              {titles[step - 1].detail}
            </Text>
          </>
        }
        contents={<>{renderStep()}</>}
        bottoms={
          step > 5 ? (
            <Button onClick={endOnboarding} backgroundColor="var(--main-blue)">
              온보딩 완료
            </Button>
          ) : (
            <>
              <Button
                backgroundColor="var(--main-blue)"
                width="var(--btn-medium)"
                onClick={handleNext}
              >
                다음
              </Button>
            </>
          )
        }
      ></OnboardLayout>
    </div>
  );
}
