import * as React from "react";
import {useState, useEffect, useMemo} from "react";
import Calendar from "react-calendar";
import styled from "styled-components";
import moment from "moment";
import {Routes, Route} from "react-router-dom";
import Text from "../components/atoms/Text";
import EventList from "../components/molecules/Schedulers/EventList";
import SchedulerHome from "../components/molecules/Schedulers/SchedulerHome";
import Scheduler from "./Scheduler";

interface EventItem {
    id: number;
    eventTitle: string;
    eventDesc: string;
    date: string;
    state: "진행중" | "완료" | "예정";
    startTime: string;
};
  
interface Props {
    states: {
      eventList: EventItem[];
    };
    selectedDate: Date | null;
    setSelectedDate: (date: Date | null) => void;
};
  
const StyledTileContent = styled.div`
    display: flex;
    justify-content: center;
    height: 100%;
    position: relative;
`;
  
const StyledDot = styled.div`
    width: 6px;
    height: 6px;
    background-color: red;
    border-radius: 50%;
    position: absolute;
`;
const TrainerMealManagement: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [eventList, seteventList] = useState<EventItem[]>([]);
    const states = {eventList};

    const bookedDay = useMemo(
        () =>
            states.eventList.map((event) =>
            moment(event.date, "YYYY-MM-DD").format("YYYY-MM-DD")
            ),
        [states.eventList]
    );

    const addDot = ({date, view}: {date: Date; view: string}) => {
        if (view !== "month") {
          return null;
        }
    
        const formattedDate = moment(date).format("YYYY-MM-DD");
        if (bookedDay.includes(formattedDate)) {
            return (
                <StyledTileContent>
                    <StyledDot />
                </StyledTileContent>
            );
        } else {
          return <StyledTileContent />;
        }
    };

    const handleDateClick = (date: Date) => {
        setSelectedDate(date);
    };
    
    const displayDate = selectedDate
    ? moment(selectedDate).format("MM.DD. dd")
    : moment().format("MM.DD. dd");

    return (
        <div className="schedulerLayout">
        <article className="calendarArea">
          <Text color="black" fontSize="20px" fontWeight="600">
            날짜를 선택해주세요
          </Text>
          <Calendar
            formatDay={(locale, date) => moment(date).format("DD")}
            showNeighboringMonth={false}
            calendarType="gregory"
            tileContent={addDot}
            onClickDay={handleDateClick}
          />
        </article>
        <article className="eventListArea">
          <Text color="#212121" fontSize="18px" fontWeight="600">
            {displayDate}
          </Text>
          <div className="eventListContainer">
            <EventList states={states} selectedDate={selectedDate} />
          </div>
      </article>
    </div>
    );
}

export default TrainerMealManagement;