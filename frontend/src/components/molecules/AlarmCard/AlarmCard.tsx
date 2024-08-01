import "./styles.css";
import Text from "../../atoms/Text";

interface Props {
  time?: string;
  state?: string;
  title: string;
  detail?: string;
  more?: "자세히 보기" | null;
  onClick?: () => void;
}

export default function AlarmCard(props: Props) {
  const {time, state, title, detail, more, onClick} = props;
  return (
    <div className="alarmCard">
      <section className="leftArea">
        <Text color="var(--sub-blue)" fontSize="12px" fontWeight="400">
          {time}
        </Text>
        <Text color="#29B126" fontSize="12px" fontWeight="400">
          {state}
        </Text>
      </section>
      <section className="centerArea">
        <Text color="black" fontSize="14px" fontWeight="600">
          {title}
        </Text>
        <Text color="var(--sub-blue)" fontSize="12px" fontWeight="400">
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
