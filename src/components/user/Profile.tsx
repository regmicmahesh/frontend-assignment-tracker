import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { changeCode, DispatchType, StoreState } from "../../redux";
import { TeacherService } from "../../services/teacher";

const MarginBox = styled.div`
  margin: 30px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 250px;
`;
const H1 = styled.h1`
  margin-bottom: 35px;
`;

const Avatar = styled.img`
  height: 100%;
  border-radius: 50%;
`;

const H3 = styled.h3`
  margin-bottom: 10px;

  a {
    color: blue;
    font-size: 0.81em;
    display: inline-block;
    margin: 0px 15px;
    padding: 5px 10px;
    cursor: pointer;
    border: 1px solid blue;
  }
`;

export const Profile: React.FC = () => {
  const user = useSelector((state: StoreState) => state.auth.user);
  const dispatch = useDispatch<DispatchType>();

  const codeChange = async () => {
    const teacherService = new TeacherService(true);
    const res = await teacherService.changeCode();

    if (!res) {
      return;
    }

    const { code } = res.data;

    dispatch(changeCode(code));
  };

  return (
    <MarginBox>
      <div>
        <H1>@{user?.username}</H1>
        <H3>Name: Joh Doe </H3>
        {user?.role === "TEACHER" && (
          <H3>
            Code: {user?.teacher_code ? user?.teacher_code : "Not Found"}
            <a onClick={codeChange}> Refresh </a>
          </H3>
        )}
        <H3>Role: {user?.role} </H3>
      </div>
      <Avatar
        src={
          user?.profile_picture
            ? user?.profile_picture
            : "https://www.theportlandclinic.com/wp-content/uploads/2019/07/Person-Curtis_4x5-e1564616444404-300x300.jpg"
        }
      />
    </MarginBox>
  );
};
