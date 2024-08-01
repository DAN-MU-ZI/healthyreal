import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { defaultInstance } from "../apis/api";

const LoginRedirect: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      localStorage.setItem("token", token);
      console.log(token);

      defaultInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;

      navigate("/intro/tutorial");
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return null;
};

export default LoginRedirect;
