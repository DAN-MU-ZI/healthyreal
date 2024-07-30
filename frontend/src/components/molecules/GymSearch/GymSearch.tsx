import React, { useState, useEffect } from "react";
import axios from "axios";
import Text from "../../atoms/Text";
import PlaceCard from "../../atoms/PlaceCard";
import { GymDto } from "../../../typescript-axios"; // Import the type definition

interface GymSearchProps {
  onboardingGym: GymDto;
  onSelectGym: (gym: GymDto) => void;
}

const GymSearch: React.FC<GymSearchProps> = ({ onboardingGym, onSelectGym }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [gyms, setGyms] = useState<GymDto[]>([]);
  const [filteredGyms, setFilteredGyms] = useState<GymDto[]>([]);

  useEffect(() => {
    // Fetch gym data from the API (here replaced with dummy data)
    const fetchGyms = async () => {
      try {
        // Dummy data to simulate API response
        const dummyGyms: GymDto[] = [
          {
            name: "Fitness First",
            address: "123 Main St, Anytown",
          },
          {
            name: "Gold's Gym",
            address: "456 Elm St, Othertown",
          },
          {
            name: "Planet Fitness",
            address: "789 Oak St, Sometown",
          },
        ];
        setGyms(dummyGyms);

        // Uncomment below if fetching from a real API
        // const response = await axios.get<GymDto[]>('API_ENDPOINT'); // Replace 'API_ENDPOINT' with the actual API endpoint
        // setGyms(response.data);
      } catch (error) {
        console.error("Failed to fetch gyms", error);
      }
    };

    fetchGyms();
  }, []);

  useEffect(() => {
    setFilteredGyms(
      gyms.filter(
        (gym) =>
          (gym.name ?? "").includes(searchTerm) || (gym.address ?? "").includes(searchTerm)
      )
    );
  }, [searchTerm, gyms]);

  useEffect(() => {
    if (onboardingGym && onboardingGym.name) {
      setSearchTerm(onboardingGym.name);
    }
  }, [onboardingGym]);

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
        {filteredGyms.map((gym, index) => (
          <div key={index}>
            <PlaceCard
              name={gym.name ?? "No Name"}
              address={gym.address ?? "No Address"}
              onClick={() => onSelectGym(gym)}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default GymSearch;
