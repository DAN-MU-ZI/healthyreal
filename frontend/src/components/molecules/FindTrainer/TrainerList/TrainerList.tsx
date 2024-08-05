import * as React from "react";
import {useNavigate} from "react-router-dom";
import {TrainerRequestGoalTypesEnum as CategoryEnum} from "../../../../typescript-axios";
import TrainerItem from "../TrainerItem";

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

const TrainerList: React.FC<Props> = ({states}) => {
  const navigate = useNavigate();

  let trainerItems = states.trainerList.map((trainer) => {
    return (
      <TrainerItem
        key={trainer.trainerId}
        id={trainer.trainerId}
        img={trainer.thumbNailUrl}
        name={trainer.name}
        lacation={trainer.address}
        number={trainer.phoneNumber}
        onClick={() => {
          navigate("detail/" + trainer.trainerId);
        }}
      />
    );
  });
  return <div>{trainerItems}</div>;
};

export default TrainerList;
