import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../providers/AuthContext";
import OnboardLayout from "../components/templates/OnboardLayout";
import Text from "../components/atoms/Text";
import Button from "../components/atoms/Button";
import dbData from "../db/data.json";
import GoalSelection from "../components/molecules/GoalSelection";
import GenderSelection from "../components/molecules/GenderSelection";
import GymSearch from "../components/molecules/GymSearch";
import LevelSelection from "../components/molecules/LevelSelection";
import Back from "../components/atoms/Back";
import StartLayout from "../components/templates/StartLayout";
import startImg from "../assets/images/testPicture.png";
import BodyInfo from "../components/molecules/BodyInfo";

export default function Onboarding() {
  const {logout} = useAuth();
  let navigate = useNavigate();
  const [onboardingData, setOnboaringData] = useState<any>({
    goalTypes: [],
    gender: "",
    bodyInfoDto: {birthDate: "", height: 0, weight: 0},
    exerciseLevel: "",
    gymDto: {name: "", address: ""},
  });
  const [step, setStep] = useState<number>(1);

  const onboarding = dbData.onboarding;

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

  const clickLogout = () => {
    logout();
    navigate("/login");
  };

  const validateStep = (): boolean => {
    switch (step) {
      case 1:
        return onboardingData.goalTypes.length > 0;
      case 2:
        return onboardingData.gender !== "";
      case 3:
        const {birthYear, height, weight} = onboardingData.bodyInfoDto;
        return birthYear !== "" && height !== "" && weight !== "";
      case 4:
        return onboardingData.gymDto !== "";
      case 5:
        return onboardingData.exerciseLevel !== "";
      default:
        return false;
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <GoalSelection
            onboardingGoals={onboardingData.goalTypes}
            onDataChange={(data) => handleDataChange("goalTypes", data)}
          />
        );
      case 2:
        return (
          <GenderSelection
            onboardingGender={onboardingData.gender}
            onDataChange={(data) => handleDataChange("gender", data)}
          />
        );
      case 3:
        return (
          <BodyInfo
            onboardingBodyInfo={onboardingData.bodyInfoDto}
            onDataChange={(data) => handleDataChange("bodyInfoDto", data)}
          />
        );
      case 4:
        return (
          <GymSearch onSelectGym={(data) => handleDataChange("gymDto", data)} />
        );
      case 5:
        return (
          <LevelSelection
            onboardingLevel={onboardingData.exerciseLevel}
            onDataChange={(data) => handleDataChange("exerciseLevel", data)}
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
            <>
              <Button
                onClick={endOnboarding}
                backgroundColor="var(--main-blue)"
                width="var(--btn-large)"
              >
                홈 화면 가기
              </Button>
              <Button
                onClick={clickLogout}
                backgroundColor="var(--main-purple)"
                width="var(--btn-large)"
              >
                다른 계정으로 로그인
              </Button>
            </>
          }
        />
      )}
    </div>
  );
}
