import {Link} from "react-router-dom";
import * as React from "react";
import {useNavigate} from "react-router-dom";
import AlarmCard from "../../AlarmCard";
import "./styles.css";
import moment from "moment";

interface EventItem {
  id?: number;
  eventTitle: string;
  eventDesc: string;
  date: string;
  state: "진행중" | "완료" | "예정";
  startTime: string;
}

interface Props {
  states: {
    eventList: EventItem[];
  };
  selectedDate: Date | null;
}

const EventList: React.FC<Props> = ({states, selectedDate}) => {
  const navigate = useNavigate();

  const selectedDateEvents = selectedDate
    ? states.eventList.filter((event) =>
        moment(event.date, "YYYY-MM-DD").isSame(selectedDate, "day")
      )
    : [];

  let eventItems = selectedDateEvents.map((event) => {
    return (
      <AlarmCard
        key={event.id}
        time={event.startTime}
        state={event.state}
        title={event.eventTitle}
        detail={event.eventDesc}
        more="자세히 보기"
        onClick={() => {
          navigate("detail/" + event.id);
        }}
      />
    );
  });

  return <div className="eventList">{eventItems}</div>;
};

export default EventList;
