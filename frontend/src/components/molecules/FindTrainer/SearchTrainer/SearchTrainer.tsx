import * as React from "react";
import {useState, useEffect} from "react";
import {SearchTrainersCategoryEnum as CategoryEnum} from "../../../../typescript-axios";
import searchIcon from "../../../../assets/images/searchIcon.png";
import filterIcon from "../../../../assets/images/filterIcon.png";
import Text from "../../../atoms/Text";
import "./styles.css";
import Button from "../../../atoms/Button";

const dummyLocations = [
  "부산광역시 전체",
  "연제구",
  "강서구",
  "해운대구",
  "사하구",
  "동래구",
  "부산진구",
  "수영구",
];

interface Props {
  callbacks: {
    filterTrainer: (
      keyword: string,
      category: CategoryEnum,
      location: string,
      callback: () => void
    ) => Promise<void>;
  };
  categories: CategoryEnum[];
  isShow: boolean;
  setShow: (show: boolean) => void;
}

const SearchTrainer: React.FC<Props> = ({
  callbacks,
  categories,
  isShow,
  setShow,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryEnum | null>(
    null
  );
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [keyword, setKeyword] = useState("");

  const categoryLabels: {[key in CategoryEnum]: string} = {
    [CategoryEnum.MuscleGain]: "근육 증가",
    [CategoryEnum.StaminaImprovement]: "지구력 향상",
    [CategoryEnum.FlexibilityImprovement]: "유연성 향상",
    [CategoryEnum.BodyShapeImprovement]: "체형 개선",
    [CategoryEnum.BalanceImprovement]: "균형 개선",
    [CategoryEnum.LifestyleImprovement]: "생활습관 개선",
    [CategoryEnum.HealthImprovement]: "건강 증진",
    [CategoryEnum.BodyProfile]: "바디 프로필",
    [CategoryEnum.Other]: "기타",
    [CategoryEnum.WeightLoss]: "체중감량",
  };

  const onClickSearch = () => {
    const locationString = selectedLocations.join(", ");
    callbacks.filterTrainer(keyword, selectedCategory!, locationString, () => {
      console.log("callback filterTrainer 실행");
    });
    if (isShow == true) setShow(false);
  };

  const onClickFilter = () => {
    setShow(!isShow);
  };

  useEffect(() => {
    setSelectedCategory(categories[0]);
  }, [categories]);

  const handleCategoryChange = (category: CategoryEnum) => {
    setSelectedCategory(category);
  };

  const handleLocationChange = (location: string) => {
    const newLocation = selectedLocations.includes(location)
      ? selectedLocations.filter((l) => l !== location)
      : [...selectedLocations, location];

    setSelectedLocations(newLocation);
  };

  return (
    <div>
      <div className="searchAndFilter">
        <div className="trainerSearchBar">
          <input
            type="text"
            placeholder="Search here"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <img
            src={searchIcon}
            alt="검색"
            className="searchIcon"
            onClick={onClickSearch}
          />
        </div>
        <div className="filterIcon">
          <img src={filterIcon} alt="검색" onClick={onClickFilter} />
        </div>
      </div>
      {isShow ? (
        <div className="filterArea">
          <div className="categoryFilter">
            <Text color="var(--main-blue)" fontSize="14px" fontWeight="600">
              카테고리 선택
            </Text>
            <div className="categoryList">
              <div className="filter-group">
                {Object.values(CategoryEnum).map((category) => (
                  <label
                    key={category}
                    className={`filter-btn ${
                      selectedCategory === category ? "checked" : ""
                    }`}
                  >
                    <input
                      type="radio"
                      value={category}
                      checked={selectedCategory === category}
                      onChange={() => handleCategoryChange(category)}
                    />
                    <span>{categoryLabels[category]}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
          <div className="locationFilter">
            <Text color="var(--main-blue)" fontSize="14px" fontWeight="600">
              위치
            </Text>
            <div className="locationList">
              <div className="filter-group">
                {dummyLocations.map((location) => (
                  <label
                    key={location}
                    className={`filter-btn ${
                      selectedLocations.includes(location) ? "checked" : ""
                    }`}
                  >
                    <input
                      type="checkbox"
                      value={location}
                      checked={selectedLocations.includes(location)}
                      onChange={() => handleLocationChange(location)}
                    />
                    <span>{location}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
          <Button
            backgroundColor="var(--main-blue)"
            width="var(--btn-small)"
            color="white"
            children="완료"
            onClick={onClickSearch}
          />
        </div>
      ) : null}
    </div>
  );
};

export default SearchTrainer;
