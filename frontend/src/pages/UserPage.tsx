import React, { useState, useEffect } from "react";
import axios from "axios";

interface User {
  id: number;
  name: string;
  email: string;
}

const UsersPage: React.FC = () => {
  const [responseData, setResponseData] = useState<User[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          // const response = await axios.get<User[]>('http://localhost:8080/api/v1/users');
          const response = await axios.get<User[]>('http://default-loadbalancer-ser-e983d-25608891-dc411cb92a75.kr.lb.naverncp.com:8080/api/v1/users');

          setResponseData(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div>Page Content</div>
      {responseData ? (
        <div>{JSON.stringify(responseData)}</div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default UsersPage;
