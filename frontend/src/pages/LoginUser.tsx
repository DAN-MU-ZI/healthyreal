// 요청하게 될 떄 필요한 코드
import React, { useState, useEffect } from "react";
import axios from "axios";
import request from "../apis/api/request";
import { useNavigate } from "react-router-dom";
import { createUserApi } from "../apis/custom";

interface User {
  userSeq: number;
  userId: string;
  username: string;
  email: string;
}

interface ApiResponse {
  user: User;
}

const LoginUser: React.FC = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  const api = createUserApi();
  const getUserData = async () => {
    try {
      const token = localStorage.getItem("token");

      if (token) {
        const response = await api.getUser();
        console.log(response);
        setUserData(response.data as User);
      }
    } catch (err) {
      console.error(error);
      if (axios.isAxiosError(err)) {
        if (err.response) {
          setError(`Login failed: ${err.response.data.message}`);
        } else if (err.request) {
          setError("Login failed: No response from server.");
        } else {
          setError(`Login failed: ${err.message}`);
        }
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  useEffect(() => {
    getUserData();
  }, []);
  useEffect(() => {
    console.log("User data updated:", userData);
  }, [userData]);

  const backToMain = () => {
    navigate("/intro/tutorial");
  };

  return (
    <div>
      <div>로그인 결과</div>
      {userData ? (
        <div>
          <h2>{userData.username}</h2>
          <p>{userData.email}</p>
          {/* <img src={userData.profileImageUrl} alt="Profile" /> */}
          <div>로그인이 정상적으로 처리되었습니다!</div>
          <button onClick={backToMain}>튜토리얼으로 돌아가기</button>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default LoginUser;
