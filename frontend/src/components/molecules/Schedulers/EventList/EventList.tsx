import {Link} from "react-router-dom";
import * as React from "react";
import {useState} from "react";
import AlarmCard from "../../AlarmCard";
import "./styles.css";
import moment from "moment";

interface EventItem {
  id?: number;
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
}

const EventList: React.FC<Props> = ({states, selectedDate}) => {
  const selectedDateEvents = selectedDate
    ? states.eventList.filter((event) =>
        moment(event.date, "YYYY-MM-DD").isSame(selectedDate, "day")
      )
    : [];

  let eventItems = selectedDateEvents.map((event) => {
    return (
      <AlarmCard
        key={event.id}
        time={moment(event.date).format("MM.DD")}
        state={event.state}
        title={event.eventTitle}
        detail={event.eventDesc}
        more="자세히 보기"
        onClick={() => {}}
      />
    );
  });

  return <div className="eventList">{eventItems}</div>;
};

export default EventList;
