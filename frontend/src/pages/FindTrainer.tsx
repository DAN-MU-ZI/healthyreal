import * as React from "react";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import FindTrainerHome from "../components/molecules/FindTrainer/FindTrainerHome";
import DetailTrainer from "../components/molecules/FindTrainer/DetailTrainer";
import { TrainerRequestGoalTypesEnum as CategoryEnum } from "../typescript-axios";
import request from "../apis/api/request";
// import {trainerApi, userApi} from "../apis/custom";


interface TrainerItem {
  thumbNailUrl: string;
  trainerId: number;
  name: string;
  address: string;
  phoneNumber: string;
  describe: string;
  categories: CategoryEnum[];
}

const FindTrainer: React.FC = () => {
  const [trainerList, setTrainerList] = useState<TrainerItem[]>(dummyData);

  // 상태관리 함수 넣기
  const getTrainer = async () => {
    console.log("get");
    try {
      const res = await request("GET", "");
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getTrainer();
  }, []);

  const filterTrainer = async (
    keyword: string,
    category: CategoryEnum[],
    location: string,
    callback: () => void
  ) => {
    console.log(keyword, category, location);
    callback();
    const data = { keyword, category, location };
  };

  const callbacks = { filterTrainer };
  const states = { trainerList };

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

const dummyData: TrainerItem[] = [
  {
    thumbNailUrl: "dd",
    trainerId: 0,
    name: "홍길동",
    address: "ㅏㅇ라ㅣㅇ",
    phoneNumber: "0202202020",
    describe: "리러ㅏ밍;ㄹ망ㄹ;ㅁㅇ람ㅇ림;ㅏ",
    categories: [CategoryEnum.WeightLoss],
  },
  {
    thumbNailUrl: "string",
    trainerId: 2,
    name: "string",
    address: "string",
    phoneNumber: "string",
    describe: "string",
    categories: [CategoryEnum.WeightLoss],
  },
  {
    thumbNailUrl: "string",
    trainerId: 1,
    name: "string",
    address: "string",
    phoneNumber: "string",
    describe: "string",
    categories: [CategoryEnum.WeightLoss],
  },
  {
    thumbNailUrl: "string",
    trainerId: 4,
    name: "string",
    address: "string",
    phoneNumber: "string",
    describe: "string",
    categories: [CategoryEnum.WeightLoss],
  },
  {
    thumbNailUrl: "string",
    trainerId: 8,
    name: "string",
    address: "string",
    phoneNumber: "string",
    describe: "string",
    categories: [CategoryEnum.WeightLoss],
  },
];
