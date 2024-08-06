import * as React from "react";
import {useState, useEffect, useMemo} from "react";
import Calendar from "react-calendar";
import styled, {keyframes} from "styled-components";
import moment from "moment";
import {Routes, Route} from "react-router-dom";
import Text from "../components/atoms/Text";
import EventList from "../components/molecules/Schedulers/EventList";
import SchedulerHome from "../components/molecules/Schedulers/SchedulerHome";
import Scheduler from "./Scheduler";
import { TrainerControllerApi, TrainerMemberMealsResponse } from "../typescript-axios";
import { createTrainerApi } from "../apis/custom";

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

const slideUp = keyframes`
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const ItemList = styled.div`
  animation: ${slideUp} 0.5s ease-in-out;
  background-color: #f9f9f9;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
`;

const Section = styled.div`
  margin-bottom: 20px;
`;

const Item = styled.div`
animation: ${slideUp} 0.5s ease-in-out;
  background: #fff;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const EmptyMessage = styled.div`
    animation: ${slideUp} 0.5s ease-in-out;
  color: #777;
  text-align: center;
  padding: 20px;
`;

const TrainerMealManagement: React.FC = () => {
    const trainerApi = createTrainerApi();
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [eventList, seteventList] = useState<EventItem[]>([]);
    const [result, setResult] = useState<TrainerMemberMealsResponse[]>([]);
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

    const loadResult = async (date: Date) => {
        const response = 
            await trainerApi.getMembersMeal(moment(date).format("YYYY-MM-DD"));
        setResult(response.data);
    };

    const handleDateClick = (date: Date) => {
        setSelectedDate(date);
        loadResult(date);
        console.log(moment(date).format("YYYY-MM-DD"));
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
      <Section>
        <ItemList>
            {result.length ? (
                result.map((meal) => (
                    <Item key={meal.memberSeq}>
                        <div>{meal.mealTitle} - {meal.mealType}</div>
                        <div>{meal.memberName}</div>
                        <div>{meal.isComment}</div>
                    </Item>
                ))
            ) : (
                <EmptyMessage>일정이 없습니다.</EmptyMessage>
            )}
        </ItemList>
      </Section>
    </div>
    );
}

export default TrainerMealManagement;