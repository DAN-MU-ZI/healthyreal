import * as React from "react";
import Text from "../components/atoms/Text";
import Button from "../components/atoms/Button";
import textPicture from "../assets/images/textPicture.png";
import OnboardingLayout from "../components/templates/OnboardingLayout";

export default function Onboarding() {
  return (
    <div>
      <OnboardingLayout
        header="none"
        contents={
          <>
            <div>swiper</div>
            <Text color="var(--main-blue)" fontSize="30px" fontWeight="600">
              함께 일정을 잡아봐요!
            </Text>
            <Text color="var(--sub-blue)" fontSize="12px" fontWeight="400">
              트레이너와 함께 일정을 조율하고, 캘린더에 기록하세요. 예약된 PT
              세션의 알림도 받아보세요.
            </Text>
            <img src={textPicture} alt="튜토리얼 사진"></img>
            <Button
              backgroundColor="var(--main-blue)"
              width="var(--btn-medium)"
              onClick={() => console.log("button good")}
            >
              다음
            </Button>
          </>
        }
        bottoms="none"
      ></OnboardingLayout>
    </div>
  );
}
