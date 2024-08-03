import * as React from "react";
import AlarmLayout from "../components/templates/AlarmLayout";
import AlarmCard from "../components/molecules/AlarmCard";
import Text from "../components/atoms/Text";

export default function Main() {
  return (
    <>
      <Text color="var(--main-blue)" fontSize="30px" fontWeight="700">
        서비스명
      </Text>

      <AlarmLayout
        title="알림"
        more="전체 보기"
        contents={
          <>
            <AlarmCard
              time="10:30"
              state="에정"
              title="개인 운동"
              detail="등, 이두 루틴하는 날"
              more="자세히 보기"
            />
            <AlarmCard
              time="10:30"
              state="에정"
              title="개인 운동"
              detail="등, 이두 루틴하는 날"
              more="자세히 보기"
            />
            <AlarmCard
              time="10:30"
              state="에정"
              title="개인 운동"
              detail="등, 이두 루틴하는 날"
              more="자세히 보기"
            />
          </>
        }
        onClick={() => console.log("hos")}
      />
    </>
  );
}
