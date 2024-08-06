import * as React from "react";
import {useState, useEffect, useMemo} from "react";
import Calendar from "react-calendar";
import styled, {keyframes} from "styled-components";
import moment from "moment";
import {Routes, Route, useParams} from "react-router-dom";
import Text from "../components/atoms/Text";
import EventList from "../components/molecules/Schedulers/EventList";
import SchedulerHome from "../components/molecules/Schedulers/SchedulerHome";
import Scheduler from "./Scheduler";
import { TrainerControllerApi, TrainerMemberDetailManagementResponse, TrainerMemberManagementResponse, TrainerMemberMealsResponse } from "../typescript-axios";
import { createTrainerApi } from "../apis/custom";

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

const UserImage = styled.img`
  height: 40px;
  width: 40px;
  border-radius: 50%;
`;

const TrainerMemberDetail: React.FC = () => {

    const trainerApi = createTrainerApi();
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [eventList, seteventList] = useState<EventItem[]>([]);
    const [result, setResult] = useState<TrainerMemberDetailManagementResponse>();
    const states = {eventList};
    const {id} = useParams<{id: string}>();

    useEffect(() => {
        const loadMember = async () => {
            const response = await trainerApi.memberDetailManagementTrainer(id);
            setResult(response.data);
            console.log("member = " + response.data);
        }

        loadMember();
    }, []);

    return (
        <>
            <Title><UserImage src={result?.profileUrl}></UserImage>회원 상세</Title>
            <ItemList>
                <Item>
                    <div>이름 : {result?.name}</div><br/>
                    <div>성별 : {result?.gender}</div><br/>
                    <div>생년월일 : {result?.birthDate}</div><br/>
                    <div>전화번호 : {result?.phone}</div><br/>
                    <h5>현재 프로그램 목록</h5>
                    <div>
                        {result?.currentProgramList?.length ? (
                            result.currentProgramList.map(program => (
                                <Item key={program.programName}>
                                    <div>프로그램명 : {program.programName}</div><br/>
                                    <div>남은 횟수 / 총 횟수 : {program.remainingCnt} / {program.totalCnt}</div>
                                </Item>
                            ))
                        ) : (
                            <EmptyMessage>수강중인 프로그램이 없습니다</EmptyMessage>
                        )}
                    </div>
                    <h5>개인 메모</h5>
                    <div>
                        {result?.memos?.length ? (
                            result.memos.map(memo => (
                                <Item key={memo}>
                                    {memo}
                                </Item>
                            ))
                        ) : (
                            <EmptyMessage>메모가 없습니다</EmptyMessage>
                        )}
                    </div>
                </Item>
            </ItemList>
        </>
    );
}

export default TrainerMemberDetail;