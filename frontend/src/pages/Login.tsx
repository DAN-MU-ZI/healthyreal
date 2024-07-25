import * as React from "react";
import { useEffect, useState } from "react";
import StartLayout from "../components/templates/StartLayout";
import Text from "../components/atoms/Text";
import Button from "../components/atoms/Button";
import googleLogo from "../assets/images/googleLogo.png";
import kakaotalkLogo from "../assets/images/kakaotalkLogo.png";
import styled from "@emotion/styled";

import { defaultInstance } from "../apis/api";
import request from "../apis/api/request";

export default function Login() {
  const TestCord = styled.div({
    width: "160px",
    height: "180px",
    backgroundColor: "lightYellow",
  });

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
    // const redirectUri = `http://localhost:8080/oauth2/authorization/${provider}?redirect_uri=http://localhost:3000/oauth/redirect`;
    const redirectUri = `http://default-loadbalancer-ser-e983d-25608891-dc411cb92a75.kr.lb.naverncp.com:8080/oauth2/authorization/${provider}?redirect_uri=http://localhost:3000/oauth/redirect`;
    console.log(redirectUri);
    if (redirectUri) {
      window.location.href = redirectUri;
    }
  };

  const clickGoogle = () => {
    handleLogin('google');
  };

  const clickKakao = () => {
    handleLogin('kakao');
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
            <TestCord onClick={() => onClickTypeCard("member")}>회원</TestCord>
            <TestCord onClick={() => onClickTypeCard("trainer")}>
              트레이너
            </TestCord>
          </>
        }
        bottoms={
          <>
            <Button
              backgroundColor="#FECA00"
              width="var(--btn-large)"
              color="var(--main-blue)"
              onClick={clickKakao}
            >
              <img src={kakaotalkLogo} alt="kakaoIcon" width="25px" />
              카카오톡으로 시작하기
            </Button>
            <Button
              backgroundColor="var(--main-purple)"
              width="var(--btn-large)"
              color="var(--main-blue)"
              onClick={clickGoogle}
            >
              <img src={googleLogo} alt="googleIcon" width="25px" />
              구글로 시작하기
            </Button>
          </>
        }
      ></StartLayout>
    </div>
  );
}
