import "./styles.css";
import Text from "../../../atoms/Text";

interface Props {
  id: number | undefined;
  img: string | undefined;
  name: string | undefined;
  lacation: string | undefined;
  number: string | undefined;
  onClick: () => void;
}

const TrainerItem = (props: Props) => {
  const {img, name, lacation, number, id, onClick} = props;
  return (
    <div className="trainerItem">
      <img src={img} alt="trainerImg" />
      <div className="trainerInfo">
        <label className="trainerLabel">
          <Text color="var(--main-blue)" fontSize="15px" fontWeight="500">
            {name}
          </Text>
          트레이너
        </label>
        <div>
          <div>
            <Text color="black" fontSize="12px" fontWeight="400">
              {lacation}
            </Text>
          </div>
          <div>
            <Text color="black" fontSize="12px" fontWeight="400">
              {number}
            </Text>
          </div>
        </div>
      </div>
      <div onClick={onClick} className="moreBtn">
        자세히보기
      </div>
    </div>
  );
};

export default TrainerItem;
