import * as React from "react";
import {useState, useEffect, useMemo} from "react";
import Calendar from "react-calendar";
import styled, {keyframes} from "styled-components";
import moment from "moment";
import {Routes, Route} from "react-router-dom";
import Text from "../components/atoms/Text";
import EventList from "../components/molecules/Schedulers/EventList";
import SchedulerHome from "../components/molecules/Schedulers/SchedulerHome";
import Scheduler from "./Scheduler";
import { TrainerControllerApi, TrainerMemberManagementResponse, TrainerMemberMealsResponse } from "../typescript-axios";
import { createTrainerApi } from "../apis/custom";
import { useNavigate } from 'react-router-dom';

interface EventItem {
    id: number;
    eventTitle: string;
    eventDesc: string;
    date: string;
    state: "진행중" | "완료" | "예정";
    startTime: string;
};
  
interface Props {
    states: {
      eventList: EventItem[];
    };
    selectedDate: Date | null;
    setSelectedDate: (date: Date | null) => void;
};

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

const Item = styled.div`
animation: ${slideUp} 0.5s ease-in-out;
  background: #fff;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);

  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px) scale(1.05);
  }
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
const TrainerMemberManagement: React.FC = () => {

    const trainerApi = createTrainerApi();
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [eventList, seteventList] = useState<EventItem[]>([]);
    const [result, setResult] = useState<TrainerMemberManagementResponse>();
    const states = {eventList};
    const navigate = useNavigate()

    useEffect(() => {
        const loadMembers = async () => {
            const response = await trainerApi.memberManagementTrainer();
            setResult(response.data);
            console.log(response.data);
        }

        loadMembers();
    }, []);

    return (
        <>
            <Title>회원 조회</Title>
            <ItemList>
                {result?.members?.length ? (
                    result.members.map( member => (
                        <Item key={member.memberSeq} onClick={() => {navigate("/trainer/members/detail/"+member.memberId)}}>
                            <h6>{member.programName}</h6>
                            <div>{member.name} - {member.gender == "MALE" ? "남" : "여"}</div>
                            <div>남은 횟수 : {member.remainingCnt} / {member.totalCnt} </div>
                        </Item>
                    ))
                ) : (
                    <EmptyMessage>회원이 없습니다</EmptyMessage>
                )}
            </ItemList>
        </>
    );
}

export default TrainerMemberManagement;