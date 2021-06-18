import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { changeTeacherId, DispatchType } from "../../redux";
import { StudentService } from "../../services/student";

const H3 = styled.h3`
  margin: 30px 0px 10px 0px;
`;

const CodeInput = styled.input`
  width: 40%;
  padding: 5px;
  height: 30px;
  margin: none;
  border: 3px solid black;
`;

const CodeSubmit = styled.button`
  cursor: pointer;
  height: 30px;
  padding: 5px 10px;
  border: none;
  font-weight: bold;
`;

export const CodeForm: React.FC = () => {
  const [code, setCode] = useState("");
  const dispatch = useDispatch<DispatchType>();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const studentService = new StudentService(true);

    const res = await studentService.joinTeacher(code);

    if (!res) {
      return;
    }

    if (res.status == 200) {
      const { message, teacher_id } = res.data;
      dispatch(changeTeacherId(teacher_id));
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <H3> Enter your code below to get started... </H3>
        <CodeInput value={code} placeholder={"XXXX-XXXX-XXXX-XXXX"} onChange={(e) => setCode(e.target.value)} />{" "}
        <CodeSubmit>Submit</CodeSubmit>
      </form>
    </div>
  );
};
