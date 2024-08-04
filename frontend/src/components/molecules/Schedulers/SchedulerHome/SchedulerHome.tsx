import * as React from "react";
import {useMemo} from "react";
import "./styles.css";
import Calendar from "react-calendar";
import moment from "moment";
import "moment/locale/ko";
import styled from "styled-components";
import Text from "../../../atoms/Text";
import EventList from "../EventList";
import {useNavigate} from "react-router-dom";

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
      date: string,
      callback: () => void
    ) => Promise<void>;
    editSchedule: (
      id: number,
      eventTitle: string,
      eventDesc: string,
      date: string,
      callback: () => void
    ) => Promise<void>;
    deleteSchedule: (id: number) => Promise<void>;
  };
  states: {
    eventList: EventItem[];
  };
  selectedDate: Date | null;
  setSelectedDate: (date: Date | null) => void;
}

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

const SchedulerHome: React.FC<Props> = ({
  callbacks,
  states,
  setSelectedDate,
  selectedDate,
}) => {
  const navigate = useNavigate();
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
          <EventList
            callbacks={callbacks}
            states={states}
            selectedDate={selectedDate}
          />
        </div>
        <div className="addEventCard" onClick={() => navigate("add")}>
          <Text color="#212121" fontSize="14px" fontWeight="600">
            추가하기
          </Text>
        </div>
      </article>
    </div>
  );
};

export default SchedulerHome;
