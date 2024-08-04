import * as React from "react";
import Text from "../../../atoms/Text";
import moment from "moment";
import "./styles.css";
import Back from "../../../atoms/Back";
import Button from "../../../atoms/Button";
import {useNavigate, useParams} from "react-router-dom";

interface EventItem {
  id: number;
  eventTitle: string;
  eventDesc: string;
  startTime: string;
  date: string;
  state: "진행중" | "완료" | "예정";
}

interface Props {
  states: {
    eventList: EventItem[];
  };
  selectedDate: Date | null;
}

const DetailScheduler: React.FC<Props> = ({selectedDate, states}) => {
  const navigate = useNavigate();
  const {id} = useParams();

  const eventItem = states.eventList.find(
    (event) => event.id === parseInt(id || "0", 10)
  );

  const displayDate = selectedDate
    ? moment(selectedDate).format("YYYY.MM.DD.dd")
    : moment().format("YYYY.MM.DD.dd");

  return (
    <div className="addEventLayout">
      <Back onClick={() => navigate("/scheduler")} />
      <Text color="var(--main-blue)" fontSize="20px" fontWeight="600">
        일정 상세보기
      </Text>
      <Text color="black" fontSize="16px" fontWeight="600">
        {displayDate}
      </Text>
      <article className="addEventForm">
        <div className="inputContainer">
          <Text color="var(--main-blue)" fontSize="14px" fontWeight="500">
            제목
          </Text>
          <div className="inputArea">
            <input
              type="text"
              className="titleInput"
              value={eventItem?.eventTitle}
              readOnly
            />
          </div>
        </div>
        <div className="inputContainer">
          <Text color="var(--main-blue)" fontSize="14px" fontWeight="500">
            일정 정보
          </Text>
          <div className="inputArea">
            <p>
              날짜 : <input type="date" value={eventItem?.date} readOnly />
            </p>
            <p>
              시작 시간 :{" "}
              <input type="text" value={eventItem?.startTime} readOnly />
            </p>
            <p>
              상태 :
              <input type="text" value={eventItem?.state} readOnly />
            </p>
          </div>
        </div>
        <div className="inputContainer">
          <Text color="var(--main-blue)" fontSize="14px" fontWeight="500">
            트레이너 정보
          </Text>
          <div className="inputArea"></div>
        </div>
        <div className="inputContainer">
          <Text color="var(--main-blue)" fontSize="14px" fontWeight="500">
            세션 설명
          </Text>
          <div className="inputArea">
            <textarea
              className="sectionInput"
              value={eventItem?.eventDesc}
              readOnly
            />
          </div>
        </div>
      </article>
    </div>
  );
};

export default DetailScheduler;
