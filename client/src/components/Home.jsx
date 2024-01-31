import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/actions/userActions";

const Home = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <div>
      <h1>Hi {userInfo?.full_name}</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;
