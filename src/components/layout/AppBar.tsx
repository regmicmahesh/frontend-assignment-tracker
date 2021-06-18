import { Link } from "react-router-dom";
import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import {StoreState} from "../../redux";

const NavBar = styled.div`
  display: flex;
  height: 3.5rem;
  gap: 30px;
  align-items: center;
`;

const Brand = styled.h2`
  flex: 0.7;
  &:hover {
    font-weight: bold;
  }
`;

const NavLink = styled.div`
  &:hover {
    font-weight: bold;
  }
`;

export const Navbar = () => {
  const authState = useSelector((state: StoreState) => state.auth);

  return (
    <NavBar>
      <Brand>
        <Link to="/">Assignment </Link>
      </Brand>
      {!authState.isAuthenticated && (
        <>
          <Link to="/login">
            <NavLink>Login</NavLink>
          </Link>
          <Link to="/register">
            <NavLink>Register</NavLink>
          </Link>
        </>
      )}


      {authState.isAuthenticated && authState.user?.role == "TEACHER" &&  (
        <>
          <Link to="/dashboard/assignment">
            <NavLink>Assignments</NavLink>
          </Link>
          <Link to="/dashboard/student">
            <NavLink>Students</NavLink>
          </Link>
          <Link to="/dashboard/profile">
            <NavLink>My Profile</NavLink>
          </Link>
          <Link to="/logout">
            <NavLink>Logout</NavLink>
          </Link>

        </>
      )}

      {authState.isAuthenticated && authState.user?.role == "STUDENT" && (
        <>
          <Link to="/dashboard/assignment">
            <NavLink>Assignments</NavLink>
          </Link>
          <Link to="/dashboard/profile">
            <NavLink>My Profile</NavLink>
          </Link>
          <Link to="/logout">
            <NavLink>Logout</NavLink>
          </Link>
        </>
      )}

    </NavBar>
  );
};

function state(state: any, arg1: (StoreState: unknown) => any) {
  throw new Error("Function not implemented.");
}
