import React from "react";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { DispatchType, logout } from "../redux";

export const LogoutScreen: React.FC = () => {
  const dispatch = useDispatch<DispatchType>();

  dispatch(logout());

  localStorage.removeItem("token");
  return <Redirect to="/" />;
};
