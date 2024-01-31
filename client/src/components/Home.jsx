import React from "react";
import { useSelector } from "react-redux";

const Home = () => {
  const { userInfo } = useSelector((state) => state.user);
  return (
    <div>
      <h1>Hi {userInfo?.full_name}</h1>
    </div>
  );
};

export default Home;
