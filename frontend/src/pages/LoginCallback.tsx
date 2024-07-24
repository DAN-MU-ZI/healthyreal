import axios from "axios";
import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";

const LoginCallback: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      localStorage.setItem("token", token);

      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }

    navigate("/login/progress");
  }, [navigate]);

  return null;
};

export default LoginCallback;
