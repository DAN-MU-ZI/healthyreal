import "./styles.css";
import Text from "../Text";

interface Props {
  level: string;
  detail: string;
  onClick?: () => void;
  backgroundColor?: string;
}

export default function LevelCard(props: Props) {
  const {level, detail, onClick, backgroundColor} = props;
  return (
    <div className="levelItem" onClick={onClick} style={{backgroundColor}}>
      <div className="level">
        <Text color="var(--main-blue)" fontSize="16px" fontWeight="400">
          {level}
        </Text>
      </div>
      <div className="levelDetail">
        <Text color="var(--sub-blue)" fontSize="12px" fontWeight="400">
          {detail}
        </Text>
      </div>
    </div>
  );
}
