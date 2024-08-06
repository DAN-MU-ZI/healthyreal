import {Outlet} from "react-router-dom";
import Navbar from "../../atoms/Navbar";

const PageLayout = () => {
  return (
    <>
      <Outlet />
      <Navbar />
    </>
  );
};

export default PageLayout;
