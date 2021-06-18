import React from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import { Profile } from "../components/user/Profile";
import { StudentList } from "../components/teacher/StudentList";
import styled from "styled-components";
import { routes } from "../utils/routeUtils";
import { AssignmentList } from "../components/assignment/AssignmentList";
import { useSelector } from "react-redux";
import { StoreState } from "../redux";
import { CodeForm } from "../components/student/CodeForm";
const BorderedContainer = styled.div`
  border: 1px solid black;
  padding: 6%;
  margin-top: 30px;
`;

const BorderedParagraph = styled.p`
  margin: 3rem 0px 1rem 0px;
  text-align: justify;
`;

const Image = styled.img`
  object-fit: cover;
  width: 100%;
`;

const BreadCrumb = styled.h3`
  display: inline-block;
  padding-bottom: 10px;
  border-bottom: 1px solid black;
  margin-bottom: 15px;
`;

export const HomeScreen = () => {
  const { pathname } = useLocation();
  const user = useSelector((state: StoreState) => state.auth.user)!;
  console.log(pathname);

  return (
    <BorderedContainer>
      <BreadCrumb>{routes.find((el) => el.path == pathname)?.name}</BreadCrumb>

      <Switch>
        <Route exact path="/dashboard">
          <h1>Welcome to Assignments!</h1>

          {user?.role === "TEACHER" || user?.teacher_id ? (
            <>
              <BorderedParagraph>
                Assignment is just that tool which helps you track your progress as a student, and help you to track
                your student's progress as a teacher.
              </BorderedParagraph>
              <Image src="/assets/img/back.png" />
            </>
          ) : (
            <CodeForm />
          )}
        </Route>

        <Route exact path="/dashboard/profile" component={Profile}></Route>

        <Route exact path="/dashboard/student" component={StudentList}></Route>
        <Route path="/dashboard/assignment" component={AssignmentList} />
      </Switch>
    </BorderedContainer>
  );
};
