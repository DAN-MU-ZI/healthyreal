import arrowImg from "../../../assets/images/arrow.png";
import "./styles.css";

interface Props {
  onClick?: () => void;
}

export default function Back(props: Props) {
  const {onClick} = props;
  return (
    <button onClick={onClick} className="back">
      <img src={arrowImg} alt="back" />
    </button>
  );
}
