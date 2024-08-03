import React, {useState, useEffect, useRef} from "react";
import axios from "axios";
import PlaceCard from "../../atoms/PlaceCard";
import "./styles.css";
import {GymDto} from "../../../typescript-axios";
import searchIcon from "../../../assets/images/searchIcon.png";

interface GymSearchProps {
  onboardingGym: GymDto;
  onSelectGym: (gym: GymDto) => void;
}

const GymSearch: React.FC<GymSearchProps> = ({onboardingGym, onSelectGym}) => {
  const apiKey = process.env.REACT_APP_KAKAO_API_KEY;
  const [searchTerm, setSearchTerm] = useState<string>("헬스장");
  const [gyms, setGyms] = useState<GymDto[]>([]);
  const [filteredGyms, setFilteredGyms] = useState<GymDto[]>([]);
  const [selectedGym, setSelectedGym] = useState<GymDto | null>(null);

  useEffect(() => {
    if (onboardingGym && onboardingGym.name) {
      setSearchTerm(onboardingGym.name);
    }
  }, [onboardingGym]);

  useEffect(() => {
    fetchGyms();
  }, []);

  const fetchGyms = async () => {
    console.log(searchTerm);
    try {
      const response = await axios.get(
        `https://dapi.kakao.com/v2/local/search/keyword.json`,
        {
          params: {
            query: searchTerm,
          },
          headers: {
            Authorization: `KakaoAK ${apiKey}`,
          },
        }
      );

      if (response.data.documents) {
        const gymsData = response.data.documents.map((gym: any) => ({
          name: gym.place_name,
          address: gym.road_address_name || gym.address_name,
        }));
        setGyms(gymsData);
      }
    } catch (error) {
      console.error("헬스장 검색에 실패했습니다.", error);
    }
  };

  useEffect(() => {
    setFilteredGyms(
      gyms.filter(
        (gym) =>
          (gym.name ?? "").includes(searchTerm) ||
          (gym.address ?? "").includes(searchTerm)
      )
    );
  }, [searchTerm, gyms]);

  const handleSelectGym = (gym: GymDto) => {
    setSelectedGym(gym);
    onSelectGym(gym);
  };

  return (
    <>
      <div className="gymSearchBar">
        <input
          type="text"
          placeholder="헬스장을 검색해주세요"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img
          src={searchIcon}
          alt="검색"
          className="searchIcon"
          onClick={fetchGyms}
        />
      </div>
      <div className="gymList">
        {filteredGyms.map((gym, index) => (
          <div key={index}>
            <PlaceCard
              name={gym.name ?? "No Name"}
              address={gym.address ?? "No Address"}
              onClick={() => handleSelectGym(gym)}
              border={
                selectedGym === gym ? "2px solid #ccccdc" : "1px solid #dcdcdc"
              }
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default GymSearch;
