import * as React from "react";
import {useState} from "react";
import "./styles.css";
import Text from "../../../atoms/Text";
import SearchTrainer from "../SearchTrainer";
import TrainerList from "../TrainerList";
import {
  SearchTrainersCategoryEnum as CategoryEnum,
  FoundTrainer,
} from "../../../../typescript-axios";

interface Props {
  callbacks: {
    filterTrainer: (
      keyword: string,
      category: CategoryEnum,
      location: string,
      callback: () => void
    ) => Promise<void>;
  };
  states: {
    trainerList: FoundTrainer[];
  };
}

const FindTrainerHome: React.FC<Props> = ({callbacks, states}) => {
  const [isShow, setShow] = useState(false);

  const categories: CategoryEnum[] = [
    CategoryEnum.WeightLoss,
    CategoryEnum.MuscleGain,
    CategoryEnum.StaminaImprovement,
    CategoryEnum.FlexibilityImprovement,
    CategoryEnum.BodyShapeImprovement,
    CategoryEnum.BalanceImprovement,
    CategoryEnum.LifestyleImprovement,
    CategoryEnum.HealthImprovement,
    CategoryEnum.BodyProfile,
    CategoryEnum.Other,
  ];

  return (
    <div className="findTrainerContainer">
      <div className="noBackHeader">
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
      <SearchTrainer
        callbacks={callbacks}
        categories={categories}
        isShow={isShow}
        setShow={setShow}
      />
      {!isShow && (
        <div className="trainerList">
          <TrainerList states={states} />
        </div>
      )}
    </div>
  );
};

export default FindTrainerHome;
