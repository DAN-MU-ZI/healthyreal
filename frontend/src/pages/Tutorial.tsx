import * as React from "react";
import {useState, useEffect} from "react";
import Text from "../components/atoms/Text";
import Button from "../components/atoms/Button";
// import testPicture from "../assets/images/testPicture.png";
import TutorialLayout from "../components/templates/TutorialLayout";
import dbData from "../db/data.json";

export default function Tutorial() {
  const [title, setTitle] = useState("null");
  const [detail, setDetail] = useState("null");
  const [img, setImg] = useState("null");
  const [page, setPage] = useState(0);

  const tutorials = dbData.tutorials;

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
      <TutorialLayout
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
      ></TutorialLayout>
    </div>
  );
}
