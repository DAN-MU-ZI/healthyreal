import {Outlet} from "react-router-dom";

const SchedulerLayout = () => {
  return (
    <>
      <Outlet />
      <div>navbar</div>
    </>
  );
};

export default SchedulerLayout;
