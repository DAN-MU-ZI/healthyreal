import React from "react";
import {NavLink} from "react-router-dom";
import "./styles.css";

const Navbar: React.FC = () => {
  return (
    <nav className="navbarMy">
      <NavLink to="/scheduler" className="nav-item">
        스케줄러
      </NavLink>
      <NavLink to="/main" className="nav-item">
        홈
      </NavLink>
      <NavLink to="/MainFood" className="nav-item">
        식단
      </NavLink>
      <NavLink to="/findTrainer" className="nav-item">
        트레이너 찾기
      </NavLink>
    </nav>
  );
};

export default Navbar;
