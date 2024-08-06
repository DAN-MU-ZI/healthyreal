import * as React from "react";
import {TrainerRequestGoalTypesEnum as CategoryEnum} from "../../../../typescript-axios";
import Text from "../../../atoms/Text";
import Back from "../../../atoms/Back";
import Button from "../../../atoms/Button";
import "./styles.css";
import {useNavigate, useParams} from "react-router-dom";

interface TrainerItem {
  thumbNailUrl: string;
  trainerId: number;
  name: string;
  address: string;
  phoneNumber: string;
  describe: string;
  categories: CategoryEnum[];
}

interface Props {
  states: {
    trainerList: TrainerItem[];
  };
}

const DetailTrainer: React.FC<Props> = ({states}) => {
  const navigate = useNavigate();
  const {id} = useParams();

  const trainerItem = states.trainerList.find(
    (trainer) => trainer.trainerId === parseInt(id || "0", 10)
  );

  return (
    <div className="trainerDetailContainer">
      <div className="backHeader">
        <Back onClick={() => navigate("/findTrainer")} />
        <Text
          color="var(--main-blue)"
          fontSize="30px"
          fontWeight="600"
          className="headerTitle"
        >
          트레이너 찾기
        </Text>
        <Text
          color="var(--main-blue)"
          fontSize="12px"
          fontWeight="400"
          className="headerDetail"
        >
          나에게 맞는 트레이너를 찾아보세요
        </Text>
      </div>
      <div className="trainerDetail">
        <div className="detail-trainerInfo">
          <img src={trainerItem?.thumbNailUrl} alt="trainer" />
          <div>
            <p>{trainerItem?.name}</p>
            <label>{trainerItem?.address}</label>
            <label>{trainerItem?.phoneNumber}</label>
          </div>
        </div>
        <div className="detail-desc">
          <div>
            <Text color="var(--main-blue)" fontSize="15px" fontWeight="500">
              소개
            </Text>
            <Text color="var(--main-blue)" fontSize="11px" fontWeight="400">
              {trainerItem?.describe}
            </Text>
          </div>
          <div>
            <Text color="var(--main-blue)" fontSize="15px" fontWeight="500">
              카테고리
            </Text>
            <Text color="var(--main-blue)" fontSize="11px" fontWeight="400">
              {trainerItem?.categories}
            </Text>
          </div>
          <div>
            <Text color="var(--main-blue)" fontSize="15px" fontWeight="500">
              개인 이력
            </Text>
            <Text color="var(--main-blue)" fontSize="11px" fontWeight="400">
              (개인이력)
            </Text>
          </div>
        </div>
        <div className="btnArea">
          <Button
            backgroundColor="var(--main-blue)"
            width="var(--btn-small)"
            color="white"
            children="상담 하기"
            onClick={() => console.log("go message!")}
          />
          <Button
            backgroundColor="var(--main-blue)"
            width="var(--btn-small)"
            color="white"
            children="공유하기"
            onClick={() => console.log("공유하기?ㅎ")}
          />
        </div>
      </div>
    </div>
  );
};

export default DetailTrainer;
