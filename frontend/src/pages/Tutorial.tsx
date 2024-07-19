import * as React from "react";
import {useState, useEffect} from "react";
import Text from "../components/atoms/Text";
import Button from "../components/atoms/Button";
import testPicture from "../assets/images/testPicture.png";
import OnboardingLayout from "../components/templates/OnboardingLayout";

export default function Tutorial() {
  const [title, setTitle] = useState("null");
  const [detail, setDetail] = useState("null");
  const [img, setImg] = useState("null");
  const [page, setPage] = useState(0);

  const tutorials = [
    {
      id: 1,
      title: "함께 일정을 잡아봐요!",
      detail:
        "트레이너와 함께 일정을 조율하고, 캘린더에 기록하세요. 예약된 PT 세션의 알림도 받아보세요.",
      imgSrc: testPicture,
    },
    {
      id: 2,
      title: "운동 기록을 남겨요!",
      detail:
        "오늘 수업에서 배운 운동과 루틴을 기록하고, 자동 저장된 데이터를 언제든지 확인하세요. 특정 운동의 자세와 무게, 횟수를 쉽게 파악하세요.",
      imgSrc: testPicture,
    },
    {
      id: 3,
      title: "식단을 공유해요!",
      detail:
        "일일 식단을 사진이나 텍스트로 업로드하고, 트레이너의 피드백을 받아보세요. 식단 기록을 한 눈에 보세요.",
      imgSrc: testPicture,
    },
    {
      id: 4,
      title: "일정을 놓치지 마세요!",
      detail:
        "예약된 PT 세션의 알림을 수강생과 트레이너에게 제공하여 중요한 일정과 운동을 놓치지 마세요.",
      imgSrc: testPicture,
    },
  ];

  useEffect(() => {
    console.log(page);
  }, [page]);

  const nextTutorial = (page: number) => {
    const contents = tutorials;
    if (page > tutorials.length - 1) {
      console.log("end!");
    } else {
      setPage((page) => page + 1);
      setTitle(contents[page].title);
      setDetail(contents[page].detail);
      setImg(contents[page].imgSrc);
    }
  };

  return (
    <div>
      <OnboardingLayout
        header="none"
        contents={
          <>
            <div>swiper</div>
            <Text color="var(--main-blue)" fontSize="30px" fontWeight="600">
              {title}
            </Text>
            <Text color="var(--sub-blue)" fontSize="12px" fontWeight="400">
              {detail}
            </Text>
            <img src={img} alt="튜토리얼 사진"></img>
            <Button
              backgroundColor="var(--main-blue)"
              width="var(--btn-medium)"
              onClick={() => nextTutorial(page)}
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
