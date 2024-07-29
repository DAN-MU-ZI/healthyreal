import React, {useState, useEffect, useRef} from "react";
import dbData from "../../../db/data.json";
import Text from "../../atoms/Text";
import PlaceCard from "../../atoms/PlaceCard";

interface Gym {
  name: string;
  address: string;
  postalCode: string;
}

interface GymSearchProps {
  onSelectGym: (gym: Gym) => void;
}

declare global {
  interface Window {
    kakao: any;
  }
}

const GymSearch: React.FC<GymSearchProps> = ({onSelectGym}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [gyms, setGyms] = useState<Gym[]>([]);
  const [filteredGyms, setFilteredGyms] = useState<Gym[]>([]);

  useEffect(() => {
    const fetchGyms = async () => {
      const gymData: Gym[] = [
        {
          name: "피트니스앤스타&PT",
          address: "부산 동구 초량동 중앙대로 75 5층 피트니스앤스타",
          postalCode: "47712",
        },
        {
          name: "달라스짐 부산대점",
          address: "부산 금정구 금강로 209 만산시티타워 지하1층",
          postalCode: "46294",
        },
        {
          name: "옐로우피티",
          address: "부산 금정구 금강로 246 1층 옐로우피티",
          postalCode: "46293",
        },
      ];
      setGyms(gymData);
    };

    fetchGyms();
  }, []);

  useEffect(() => {
    setFilteredGyms(
      gyms.filter(
        (gym) =>
          gym.name.includes(searchTerm) || gym.address.includes(searchTerm)
      )
    );
  }, [searchTerm, gyms]);
  return (
    <>
      <div className="gymSearchBar">
        <input
          type="text"
          placeholder="주소를 입력해주세요."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button id="search-btn">검색</button>
      </div>
      <div className="gymList">
        {gyms.map((gym, index) => (
          <div key={index}>
            <PlaceCard
              name={gym.name}
              address={gym.address}
              postalCode={gym.postalCode}
              onClick={() => onSelectGym(gym)}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default GymSearch;
