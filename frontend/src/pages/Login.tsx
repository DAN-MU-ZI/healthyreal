import * as React from "react";
import {useEffect, useState} from "react";
import StartLayout from "../components/templates/StartLayout";
import Text from "../components/atoms/Text";
import Button from "../components/atoms/Button";
import naverLogo from "../assets/images/naverLogo.png";
import trainerIcon from "../assets/images/trainerIcon.png";
import memberIcon from "../assets/images/memberIcon.png";
import styled from "@emotion/styled";
import request from "../apis/api/request";
import axios from "axios";
import Card from "../components/atoms/Card";
import googleLogo from "../assets/images/googleLogo.png";
import kakaotalkLogo from "../assets/images/kakaotalkLogo.png";

export default function Login() {
  const baceUrl = process.env.REACT_APP_BACE_URL;
  const redirect_url = "http://localhost:3000/oauth/redirect";
  const [memberType, setMemberType] = useState("");

  const onClickTypeCard = (type: string) => {
    console.log(`memberType : ${type}`);
    setMemberType(type);
  };

  useEffect(() => {
    console.log(memberType);
  }, [memberType]);

  const clickLogin = () => {
    console.log(memberType);
    getData();
  };

  // 인증이 필요없는 데이터 요청
  const getData = async () => {
    try {
      const res = await request("GET", "/source/1");
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogin = (provider: string) => {
    const redirectUrl = `${baceUrl}/oauth2/authorization/${provider}?redirect_uri=${redirect_url}`;
    console.log(redirectUrl);
    if (redirectUrl) {
      window.location.href = redirectUrl;
    }
  };

  const clickKakao = () => {
    handleLogin("kakao");
  };

  const clickNaver = () => {
    handleLogin("naver");
  };

  return (
    <div>
      <StartLayout
        header={
          <>
            <Text color="var(--main-blue)" fontSize="30px" fontWeight="600">
              환영합니다!
            </Text>
            <Text color="var(--sub-blue)" fontSize="12px" fontWeight="400">
              개인 맞춤형 트레이닝과 식단 관리로 목표를 달성하세요.
            </Text>
          </>
        }
        contents={
          <>
            <Card
              onClick={() => onClickTypeCard("member")}
              src={memberIcon}
              selected={memberType === "member"}
            >
              일반 회원
            </Card>
            <Card
              onClick={() => onClickTypeCard("trainer")}
              src={trainerIcon}
              selected={memberType === "trainer"}
            >
              트레이너
            </Card>
          </>
        }
        bottoms={
          <>
            <Button
              backgroundColor="#2cb24a"
              width="var(--btn-large)"
              color="white"
              onClick={clickNaver}
            >
              <img src={naverLogo} alt="naverIcon" width="25px" />
              네이버로 시작하기
            </Button>
            <Button
              backgroundColor="#FECA00"
              width="var(--btn-large)"
              color="var(--main-blue)"
              onClick={clickKakao}
            >
              <img src={kakaotalkLogo} alt="googleIcon" width="25px" />
              카카오톡으로 시작하기
            </Button>
          </>
        }
      ></StartLayout>
    </div>
  );
}
