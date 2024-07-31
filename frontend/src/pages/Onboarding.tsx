import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../providers/AuthContext";
import OnboardLayout from "../components/templates/OnboardLayout";
import Text from "../components/atoms/Text";
import Button from "../components/atoms/Button";
import dbData from "../db/data.json";
import GoalSelection from "../components/molecules/GoalSelection";
import GenderSelection from "../components/molecules/GenderSelection";
import GymSearch from "../components/molecules/GymSearch";
import LevelSelection from "../components/molecules/LevelSelection";
import Back from "../components/atoms/Back";
import BodyInfo from "../components/molecules/BodyInfo";
import { userApi } from "../apis/custom";
import {
  MemberRegisterRequest,
  BodyInfoDto,
  GymDto,
  UserInfoExerciseLevelEnum,
} from "../typescript-axios";

const initialOnboardingData: MemberRegisterRequest = {
  goalTypes: [],
  gender: undefined,
  bodyInfoDto: {
    birthDate: "",
    height: 0,
    weight: 0,
  },
  gymDto: {
    name: "",
    address: "",
  },
  exerciseLevel: undefined,
  agreeToReceive: false,
};

export default function Onboarding() {
  const { logout } = useAuth();
  let navigate = useNavigate();
  const [onboardingData, setOnboardingData] = useState<MemberRegisterRequest>(
    initialOnboardingData
  );
  const [step, setStep] = useState<number>(1);

  const onboarding = dbData.onboarding;
  const tutorials = dbData.tutorials;

  const handleDataChange = (key: keyof MemberRegisterRequest, data: any) => {
    setOnboardingData({ ...onboardingData, [key]: data });
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep(step + 1);
    } else {
      alert("모든 필드를 입력해주세요.");
    }
    console.log(onboardingData);
  };

  const endOnboarding = async () => {
    try {
      console.log(onboardingData)
      await userApi.registerMember(onboardingData);
      navigate(`/main`);
    } catch (error) {
      console.error("온보딩 중 오류가 발생했습니다.", error);
      alert("온보딩 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  const clickLogout = () => {
    logout();
    navigate("/login");
  };

  const validateStep = (): boolean => {
    switch (step) {
      case 1:
        return Array.isArray(onboardingData.goalTypes) && onboardingData.goalTypes.length > 0;
      case 2:
        return onboardingData.gender !== undefined && onboardingData.gender !== null;
      case 3:
        const { birthDate = "", height = 0, weight = 0 } = onboardingData.bodyInfoDto || {};
        return birthDate !== "" && height > 0 && weight > 0;
      case 4:
        return onboardingData.gymDto?.name !== "";
      case 5:
        return onboardingData.exerciseLevel !== undefined && onboardingData.exerciseLevel !== null;
      default:
        return false;
    }
  };



  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <GoalSelection
            onboardingGoals={onboardingData.goalTypes || []}
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
            onboardingBodyInfo={onboardingData.bodyInfoDto as BodyInfoDto}
            onDataChange={(data) => handleDataChange("bodyInfoDto", data)}
          />
        );
      case 4:
        return (
          <GymSearch
            onboardingGym={onboardingData.gymDto as GymDto}
            onSelectGym={(data) => handleDataChange("gymDto", data)}
          />
        );
      case 5:
        return (
          <LevelSelection
            onboardingLevel={onboardingData.exerciseLevel as UserInfoExerciseLevelEnum}
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
      <OnboardLayout
        header={step === 1 ? null : <Back onClick={clickBack} />}
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
          step > 5 ? (
            <Button onClick={endOnboarding} backgroundColor="var(--main-blue)">
              온보딩 완료
            </Button>
          ) : (
            <Button
              backgroundColor="var(--main-blue)"
              width="var(--btn-medium)"
              onClick={handleNext}
            >
              다음
            </Button>
          )
        }
      ></OnboardLayout>
    </div>
  );
}
