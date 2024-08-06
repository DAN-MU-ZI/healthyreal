import * as React from "react";
import {useState, useEffect} from "react";
import {Routes, Route} from "react-router-dom";
import SchedulerHome from "../components/molecules/Schedulers/SchedulerHome";
import AddScheduler from "../components/molecules/Schedulers/AddScheduler";
import EditScheduler from "../components/molecules/Schedulers/EditScheduler";
import DetailScheduler from "../components/molecules/Schedulers/DetailScheduler";

interface EventItem {
  id: number;
  eventTitle: string;
  eventDesc: string;
  startTime: string;
  date: string;
  state: "진행중" | "완료" | "예정";
}

const Scheduler: React.FC = () => {
  const [eventList, seteventList] = useState<EventItem[]>(dummyData);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // 상태관리 함수 넣기
  const getSchedule = () => {
    console.log("get");
  };

  useEffect(() => {
    getSchedule();
  }, []);

  const addSchedule = async (
    eventTitle: string,
    eventDesc: string,
    date: string,
    state: "진행중" | "완료" | "예정" | "",
    startTime: string,
    callback: () => void
  ) => {
    console.log(eventTitle, eventDesc, date, state, startTime);
    callback();
    // post Event
  };

  const editSchedule = async (
    id: number,
    eventTitle: string,
    eventDesc: string,
    date: string,
    state: "진행중" | "완료" | "예정" | "",
    startTime: string,
    callback: () => void
  ) => {
    console.log(eventTitle, eventDesc, date, state, startTime);
    // 실제 수정 로직 구현
    callback();
  };

  const deleteSchedule = async (id: number) => {
    console.log("delete" + id);
    // 실제 삭제 로직 구현
  };

  const callbacks = {addSchedule, editSchedule, deleteSchedule};
  const states = {eventList};

  return (
    <Routes>
      <Route
        index
        element={
          <SchedulerHome
            states={states}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        }
      />
      <Route
        path="add"
        element={
          <AddScheduler callbacks={callbacks} selectedDate={selectedDate} />
        }
      />
      <Route
        path="edit/:id"
        element={
          <EditScheduler
            callbacks={callbacks}
            selectedDate={selectedDate}
            states={states}
          />
        }
      />
      <Route
        path="detail/:id"
        element={
          <DetailScheduler
            states={states}
            selectedDate={selectedDate}
            callbacks={callbacks}
          />
        }
      />
    </Routes>
  );
};

export default Scheduler;

const dummyData: EventItem[] = [
  {
    id: 1,
    date: "2024-08-12",
    state: "진행중",
    eventTitle: "개인운동",
    eventDesc: "등, 이두 루틴하는 날",
    startTime: "10:00",
  },
  {
    id: 2,
    date: "2024-08-17",
    state: "진행중",
    eventTitle: "개인운동",
    eventDesc: "등, 이두 루틴하는 날",
    startTime: "10:00",
  },
  {
    id: 3,
    date: "2024-08-21",
    state: "진행중",
    eventTitle: "개인운동",
    eventDesc: "등, 이두 루틴하는 날",
    startTime: "10:00",
  },
  {
    id: 4,
    date: "2024-08-22",
    state: "진행중",
    eventTitle: "개인운동",
    eventDesc: "등, 이두 루틴하는 날",
    startTime: "10:00",
  },
  {
    id: 5,
    date: "2024-08-30",
    state: "진행중",
    eventTitle: "개인운동",
    eventDesc: "등, 이두 루틴하는 날",
    startTime: "10:00",
  },
  {
    id: 6,
    date: "2024-08-22",
    state: "진행중",
    eventTitle: "개인운동",
    eventDesc:
      "등, 이두 루틴하는 날 등, 이두 루틴하는 날등, 이두 루틴하는 날등, 이두 루틴하는 날",
    startTime: "10:00",
  },
  {
    id: 7,
    date: "2024-08-22",
    state: "진행중",
    eventTitle: "개인운동",
    eventDesc:
      "등, 이두 루틴하는 날 등, 이두 루틴하는 날등, 이두 루틴하는 날등, 이두 루틴하는 날",
    startTime: "10:00",
  },
  {
    id: 68,
    date: "2024-08-22",
    state: "예정",
    eventTitle: "개인운동",
    eventDesc:
      "등, 이두 루틴하는 날 등, 이두 루틴하는 날등, 이두 루틴하는 날등, 이두 루틴하는 날",
    startTime: "10:00",
  },
  {
    id: 76,
    date: "2024-08-22",
    state: "진행중",
    eventTitle: "개인운동",
    eventDesc:
      "등, 이두 루틴하는 날 등, 이두 루틴하는 날등, 이두 루틴하는 날등, 이두 루틴하는 날",
    startTime: "10:00",
  },
  {
    id: 65,
    date: "2024-08-22",
    state: "완료",
    eventTitle: "개인운동",
    eventDesc:
      "등, 이두 루틴하는 날 등, 이두 루틴하는 날등, 이두 루틴하는 날등, 이두 루틴하는 날",
    startTime: "10:00",
  },
];