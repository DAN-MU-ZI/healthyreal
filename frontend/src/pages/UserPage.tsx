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
          const response = await axios.get<User[]>(`${process.env.REACT_APP_BASE_URL}/api/v1/users`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
              }
            }
          );

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
