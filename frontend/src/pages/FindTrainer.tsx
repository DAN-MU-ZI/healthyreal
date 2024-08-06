import * as React from "react";
import {useState, useEffect} from "react";
import {Routes, Route, useNavigate} from "react-router-dom";
import FindTrainerHome from "../components/molecules/FindTrainer/FindTrainerHome";
import DetailTrainer from "../components/molecules/FindTrainer/DetailTrainer";
import {SearchTrainersCategoryEnum as CategoryEnum} from "../typescript-axios";
import {SearchTrainerResponse, FoundTrainer} from "../typescript-axios";
import {createTrainerApi} from "../apis/custom";

const FindTrainer: React.FC = () => {
  const [trainerList, setTrainerList] = useState<FoundTrainer[]>([]);

  // 상태관리 함수 넣기
  const filterTrainer = async (
    keyword: string,
    category: CategoryEnum,
    location: string,
    callback: () => void
  ) => {
    console.log(keyword, category, location);
    callback();

    try {
      const trainerApi = createTrainerApi();
      const res = await trainerApi.searchTrainers(keyword, category, location);
      // console.log(res.data as TrainerItem[]);
      setTrainerList(res.data.trainers ?? []);
    } catch (error) {
      console.error("트레이너를 불러오는 중 오류가 발생했습니다.", error);
      alert("트레이너를 불러오는 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  const callbacks = {filterTrainer};
  const states = {trainerList};

  return (
    <Routes>
      <Route
        index
        element={<FindTrainerHome states={states} callbacks={callbacks} />}
      />
      <Route path="detail/:id" element={<DetailTrainer states={states} />} />
    </Routes>
  );
};

export default FindTrainer;
