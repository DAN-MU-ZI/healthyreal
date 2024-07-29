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
import GymSearch from "../components/molecules/GymSearch";
import LevelSelection from "../components/molecules/LevelSelection";
import Back from "../components/atoms/Back";

export default function Onboarding() {
  let navigate = useNavigate();
  const [title, setTitle] = useState("null");
  const [detail, setDetail] = useState("null");
  const [onboardingData, setOnboaringData] = useState<any>({
    goals: [],
    gender: "",
    bodyInfo: {birthYear: "", height: "", weight: ""},
    level: "",
    gym: "",
  });
  const [step, setStep] = useState<number>(1);

  const titles = dbData.titles;

  const handleDataChange = (key: string, data: any) => {
    setOnboaringData({...onboardingData, [key]: data});
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep(step + 1);
    } else {
      alert("모든 필드를 입력해주세요.");
    }
    console.log(onboardingData);
  };

  const endOnboarding = () => {
    navigate(`/main`);
  };

  const validateStep = (): boolean => {
    switch (step) {
      case 1:
        return onboardingData.goals.length > 0;
      case 2:
        return onboardingData.gender !== "";
      case 3:
        const {birthYear, height, weight} = onboardingData.bodyInfo;
        return birthYear !== "" && height !== "" && weight !== "";
      case 4:
        return onboardingData.place !== "";
      case 5:
        return onboardingData.level !== "";
      default:
        return false;
    }
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
          <GymSearch onSelectGym={(gym) => handleDataChange("gym", gym)} />
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

  const clickBack = () => {
    setStep(step - 1);
  };

  return (
    <div className="divTag">
      <OnboardLayout
        header={step == 1 ? null : <Back onClick={clickBack} />}
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
