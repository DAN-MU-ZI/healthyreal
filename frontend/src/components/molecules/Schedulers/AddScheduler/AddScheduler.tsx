import * as React from "react";
import Text from "../../../atoms/Text";
import moment from "moment";
import "./styles.css";
import Back from "../../../atoms/Back";
import Button from "../../../atoms/Button";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

interface Props {
  callbacks: {
    addSchedule: (
      eventTitle: string,
      eventDesc: string,
      date: string,
      state: string,
      time: string,
      callback: () => void
    ) => Promise<void>;
  };
  selectedDate: Date | null;
}

const AddScheduler: React.FC<Props> = ({callbacks, selectedDate}) => {
  let [eventTitle, setEventTitle] = useState("");
  let [eventDesc, setEventDesc] = useState("");
  let [date, setDate] = useState("");
  let [time, setTime] = useState("");
  let [state, setState] = useState("");
  let [errorMessages, setErrorMessages] = useState<string[]>([]);

  const navigate = useNavigate();

  const validate = () => {
    const newErrors: string[] = [];

    if (!eventTitle || !eventDesc || !date || !time || !state)
      newErrors.push("모든 정보를 입력해주세요.");

    return newErrors;
  };

  const onClickSave = () => {
    const validationErrors = validate();
    if (validationErrors.length > 0) {
      setErrorMessages(validationErrors);
      return;
    }

    setErrorMessages([]);

    callbacks.addSchedule(eventTitle, eventDesc, date, state, time, () => {
      navigate("/scheduler");
    });
  };

  const displayDate = selectedDate
    ? moment(selectedDate).format("YYYY.MM.DD.dd")
    : moment().format("YYYY.MM.DD.dd");

  return (
    <div className="addEventLayout">
      <Back onClick={() => navigate("/scheduler")} />
      <Text color="var(--main-blue)" fontSize="20px" fontWeight="600">
        일정 추가하기
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
              value={eventTitle}
              onChange={(e) => setEventTitle(e.target.value)}
            />
          </div>
        </div>
        <div className="inputContainer">
          <Text color="var(--main-blue)" fontSize="14px" fontWeight="500">
            일정 정보
          </Text>
          <div className="inputArea">
            <p>
              날짜 :{" "}
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </p>
            <p>
              시작 시간 :{" "}
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </p>
            <p>
              상태 :{" "}
              <select value={state} onChange={(e) => setState(e.target.value)}>
                <option value="">선택하기</option>
                <option value="예정">예정</option>
                <option value="진행중">진행중</option>
                <option value="완료">완료</option>
              </select>
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
              value={eventDesc}
              onChange={(e) => setEventDesc(e.target.value)}
            />
          </div>
        </div>
      </article>
      {errorMessages.length > 0 && (
        <div className="errorMessages">
          {errorMessages.map((error, index) => (
            <Text key={index} color="red" fontSize="12px" fontWeight="400">
              {error}
            </Text>
          ))}
        </div>
      )}
      <div className="backBtn">
        <Button
          backgroundColor="var(--main-blue)"
          width="var(--btn-small)"
          color="white"
          children="저장"
          onClick={onClickSave}
        />
      </div>
    </div>
  );
};

export default AddScheduler;
