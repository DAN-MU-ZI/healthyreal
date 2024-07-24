import React, {useState, useEffect} from "react";
import axios from "axios";
import request from "../apis/api/request";
import {useNavigate} from "react-router-dom";

interface User {
  id: number;
  name: string;
  email: string;
}

const LoginProgress: React.FC = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<User[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const getUserData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        // const response = await axios.get<User[]>('http://localhost:8080/api/v1/users', {
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //   },
        // });
        const response = await request("GET", "/api/v1/users");
        setUserData(response.data as User[]);
        console.log(response.data);
      }
      setError(null);
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
        // 예상치 못한 오류 타입의 처리
        setError("An unexpected error occurred.");
      }
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const backToMain = () => {
    navigate("/main");
  };

  return (
    <div>
      <div>로그인 결과</div>
      {userData ? (
        userData.map((user) => (
          <div key={user.id}>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
            <div>로그인이 정상적으로 처리되었습니다!</div>
            <button onClick={backToMain}>메인화면으로 돌아가기</button>
          </div>
        ))
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default LoginProgress;
