import "./styles.css";
import Text from "../../atoms/Text";

interface Props {
  time?: string;
  state?: "진행중" | "완료" | "예정";
  title: string;
  detail?: string;
  more?: "자세히 보기" | null;
  onClick?: () => void;
}

export default function AlarmCard(props: Props) {
  const {time, state, title, detail, more, onClick} = props;
  const textColor = (state?: "진행중" | "완료" | "예정"): string => {
    if (state === "진행중") {
      return "#29B126";
    } else if (state === "완료") {
      return "#CB0C0C";
    } else if (state === "예정") {
      return "#FF9228";
    } else {
      return "#000000";
    }
  };

  return (
    <div className="alarmCard">
      <section className="leftArea">
        <Text color="var(--sub-blue)" fontSize="12px" fontWeight="400">
          {time}
        </Text>
        <Text color={textColor(state)} fontSize="12px" fontWeight="400">
          {state}
        </Text>
      </section>
      <section className="centerArea">
        <Text
          color="black"
          fontSize="14px"
          fontWeight="600"
          className="eventTitle"
        >
          {title}
        </Text>
        <Text
          color="var(--sub-blue)"
          fontSize="12px"
          fontWeight="400"
          className="eventDetail"
        >
          {detail}
        </Text>
      </section>
      <section className="rightArea">
        <Text color="#4F28E1" fontSize="12px" fontWeight="400">
          <p onClick={onClick}>{more}</p>
        </Text>
      </section>
    </div>
  );
}
