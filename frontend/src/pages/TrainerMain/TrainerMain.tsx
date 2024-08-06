import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import ScheduleItem from './ScheduleItem';
import MealItem from './MealItem';
import MemberItem from './MemberItem';
import NavigationButton from './MainButton';
import logoURL from '../../assets/images/healthyrealLogo.png';
import { TrainerControllerApi, TrainerMainPageResponse, ScheduleDTO, MealDTO, MemberDTO, LocalTime, UserResponse } from '../../typescript-axios';
import { createTrainerApi, createUserApi } from '../../apis/custom';
import MainButton from './MainButton';
import { useNavigate } from 'react-router-dom';

const slideUp = keyframes`
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Logo = styled.img`
  height: 40px;
`;

const UserImage = styled.img`
  height: 40px;
  width: 40px;
  border-radius: 50%;
`;

const Section = styled.div`
  margin-bottom: 20px;
`;

const Title = styled.h2`
  font-size: 18px;
  margin-bottom: 10px;
  color: var(--main-blue);
`;

const ItemList = styled.div`
  animation: ${slideUp} 0.5s ease-in-out;
  background-color: #f9f9f9;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
`;

const EmptyMessage = styled.div`
  color: #777;
  text-align: center;
  padding: 20px;
`;

const MainButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px; /* 버튼 사이의 간격 */
  margin-top: 20px;
`;

const TrainerMain: React.FC = () => {
  const [mainResponse, setMainResponse] = useState<TrainerMainPageResponse | null>(null);
  const [userURL, setUserURL] = useState<string>();
  const [user, setUser] = useState<UserResponse>();
  const navigate = useNavigate()

  useEffect(() => {
    const userApi = createUserApi();
    const loadUser = async () => {
      const userResponse = await userApi.getUser();
      setUser(userResponse.data);
      setUserURL(userResponse.data.profileImageUrl);
    };
    loadUser();

    const trainerApi = createTrainerApi();
    const loadMainpage = async () => {
      const mainPageResponse = await trainerApi.mainTrainer();
      setMainResponse(mainPageResponse.data);
    };
    loadMainpage();
  }, []);

  if (!mainResponse) {
    return <div>Loading...</div>; // 데이터를 불러오는 동안 로딩 표시
  }

  return (
    <div>
      <Header>
        <Logo src={logoURL} alt="HealthyReal Logo" />
        <UserImage src={userURL} alt="User Profile" />
      </Header>

      <Section>
        <Title>오늘 일정</Title>
        <ItemList>
          {mainResponse.schedules?.length ? (
            mainResponse.schedules.map(schedule => (
              <ScheduleItem key={schedule.scheduleId} schedule={schedule} />
            ))
          ) : (
            <EmptyMessage>일정이 없습니다</EmptyMessage>
          )}
        </ItemList>
      </Section>

      <Section>
        <Title>식단 인증 요청</Title>
        <ItemList>
          {mainResponse.meals?.length ? (
            mainResponse.meals.map(meal => (
              <MealItem key={meal.mealId} meal={meal} />
            ))
          ) : (
            <EmptyMessage>식단 인증 요청이 없습니다</EmptyMessage>
          )}
        </ItemList>
      </Section>

      <Section>
        <Title>회원 관리</Title>
        <ItemList>
          {mainResponse.members?.length ? (
            mainResponse.members.map(member => (
              <MemberItem key={member.memberSeq} member={member} />
            ))
          ) : (
            <EmptyMessage>회원이 없습니다</EmptyMessage>
          )}
        </ItemList>
      </Section>

      <MainButtonsContainer>
        <MainButton label="회원 관리" />
        <div onClick={()=> {navigate("/trainer/meal")}}>
        <MainButton label="식단 관리" />
        </div>
        <MainButton label="일정 관리" />
      </MainButtonsContainer>
    </div>
  );
};

export default TrainerMain;
