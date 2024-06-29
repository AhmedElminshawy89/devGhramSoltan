import { Outlet } from "react-router-dom";

const Index = () => {
  return (
    <div className="content-layout">
      <Outlet />
    </div>
  );
};

export default Index;
