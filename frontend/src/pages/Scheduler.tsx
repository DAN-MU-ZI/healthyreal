import * as React from "react";
import {useState} from "react";
import SchedulerHome from "../components/molecules/Schedulers/SchedulerHome";

interface EventItem {
  id: number;
  eventTitle: string;
  eventDesc: string;
  date: string;
  state: string;
}

interface Props {
  callbacks: {
    addSchedule: (
      eventTitle: string,
      eventDesc: string,
      data: string,
      callback: () => void
    ) => Promise<void>;
    editSchedule: (
      id: number,
      eventTitle: string,
      eventDesc: string,
      data: string,
      callback: () => void
    ) => Promise<void>;
    deleteSchedule: (id: number) => Promise<void>;
  };
  states: {
    eventList: EventItem[];
  };
}

const dummyData: EventItem[] = [
  {
    id: 1,
    date: "2024-08-12",
    state: "진행중",
    eventTitle: "개인운동",
    eventDesc: "등, 이두 루틴하는 날",
  },
  {
    id: 2,
    date: "2024-08-17",
    state: "진행중",
    eventTitle: "개인운동",
    eventDesc: "등, 이두 루틴하는 날",
  },
  {
    id: 3,
    date: "2024-08-21",
    state: "진행중",
    eventTitle: "개인운동",
    eventDesc: "등, 이두 루틴하는 날",
  },
  {
    id: 4,
    date: "2024-08-22",
    state: "진행중",
    eventTitle: "개인운동",
    eventDesc: "등, 이두 루틴하는 날",
  },
  {
    id: 5,
    date: "2024-08-30",
    state: "진행중",
    eventTitle: "개인운동",
    eventDesc: "등, 이두 루틴하는 날",
  },
  {
    id: 6,
    date: "2024-08-22",
    state: "진행중",
    eventTitle: "개인운동",
    eventDesc:
      "등, 이두 루틴하는 날 등, 이두 루틴하는 날등, 이두 루틴하는 날등, 이두 루틴하는 날",
  },
  {
    id: 6,
    date: "2024-08-22",
    state: "진행중",
    eventTitle: "개인운동",
    eventDesc:
      "등, 이두 루틴하는 날 등, 이두 루틴하는 날등, 이두 루틴하는 날등, 이두 루틴하는 날",
  },
  {
    id: 6,
    date: "2024-08-22",
    state: "진행중",
    eventTitle: "개인운동",
    eventDesc:
      "등, 이두 루틴하는 날 등, 이두 루틴하는 날등, 이두 루틴하는 날등, 이두 루틴하는 날",
  },
  {
    id: 6,
    date: "2024-08-22",
    state: "진행중",
    eventTitle: "개인운동",
    eventDesc:
      "등, 이두 루틴하는 날 등, 이두 루틴하는 날등, 이두 루틴하는 날등, 이두 루틴하는 날",
  },
  {
    id: 6,
    date: "2024-08-22",
    state: "진행중",
    eventTitle: "개인운동",
    eventDesc:
      "등, 이두 루틴하는 날 등, 이두 루틴하는 날등, 이두 루틴하는 날등, 이두 루틴하는 날",
  },
];

const Scheduler: React.FC = () => {
  const [eventList, seteventList] = useState<EventItem[]>(dummyData);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // 상태관리 함수 넣기
  const getSchedule = () => {
    console.log("delete");
  };

  const addSchedule = async (
    eventTitle: string,
    eventDesc: string,
    date: string,
    callback: () => void
  ) => {
    console.log("add");
    // 실제 추가 로직 구현
    callback();
  };

  const editSchedule = async (
    id: number,
    eventTitle: string,
    eventDesc: string,
    date: string,
    callback: () => void
  ) => {
    console.log("edit");
    // 실제 수정 로직 구현
    callback();
  };

  const deleteSchedule = async (id: number) => {
    console.log("delete");
    // 실제 삭제 로직 구현
  };

  const callbacks = {addSchedule, editSchedule, deleteSchedule};
  const states = {eventList};

  return (
    <SchedulerHome
      callbacks={callbacks}
      states={states}
      selectedDate={selectedDate}
      setSelectedDate={setSelectedDate}
    />
  );
};

export default Scheduler;
