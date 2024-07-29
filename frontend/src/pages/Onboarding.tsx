import * as React from "react";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import OnboardLayout from "../components/templates/OnboardLayout";
import Text from "../components/atoms/Text";
import Button from "../components/atoms/Button";
import dbData from "../db/data.json";
import GoalSelection from "../components/molecules/GoalSelection";
import GenderSelection from "../components/molecules/GenderSelection";
import BodyInfo from "../components/molecules/BodyInfo";
import GymSearch from "../components/molecules/GymSearch";
import LevelSelection from "../components/molecules/LevelSelection";
import Back from "../components/atoms/Back";
import TutorialLayout from "../components/templates/TutorialLayout";
import StartLayout from "../components/templates/StartLayout";
import startImg from "../assets/images/testPicture.png";

export default function Onboarding() {
  let navigate = useNavigate();
  const [onboardingData, setOnboaringData] = useState<any>({
    goals: [],
    gender: "",
    bodyInfo: {birthYear: "", height: "", weight: ""},
    level: "",
    gym: "",
  });
  const [step, setStep] = useState<number>(1);

  const onboarding = dbData.onboarding;
  const tutorials = dbData.tutorials;

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
      {step < 6 ? (
        <OnboardLayout
          header={step == 1 ? null : <Back onClick={clickBack} />}
          title={
            <>
              <Text color="var(--main-blue)" fontSize="30px" fontWeight="600">
                {onboarding[step - 1].title}
              </Text>
              <Text color="var(--sub-blue)" fontSize="12px" fontWeight="400">
                {onboarding[step - 1].detail}
              </Text>
            </>
          }
          contents={<>{renderStep()}</>}
          bottoms={
            <>
              <Button
                backgroundColor="var(--main-blue)"
                width="var(--btn-medium)"
                onClick={handleNext}
              >
                다음
              </Button>
            </>
          }
        />
      ) : (
        <StartLayout
          header={
            <>
              <Text color="var(--main-blue)" fontSize="30px" fontWeight="600">
                시작하기
              </Text>
              <Text color="var(--sub-blue)" fontSize="12px" fontWeight="400">
                지금 바로 건강한 변화를 만들어보세요!
              </Text>
            </>
          }
          contents={
            <img src={startImg} alt="튜토리얼 사진" width="180px"></img>
          }
          bottoms={
            <Button
              onClick={endOnboarding}
              backgroundColor="var(--main-blue)"
              width="var(--btn-large)"
            >
              시작하기
            </Button>
          }
        />
      )}
    </div>
  );
}
