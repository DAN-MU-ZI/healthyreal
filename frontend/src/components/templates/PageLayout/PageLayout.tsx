import {Outlet} from "react-router-dom";
import Navbar from "../../atoms/Navbar";
import "./styles.css";

const PageLayout = () => {
  return (
    <div className="nabBarContainer">
      <Outlet />
      <Navbar />
    </div>
  );
};

export default PageLayout;
