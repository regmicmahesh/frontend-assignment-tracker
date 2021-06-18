import React, { useEffect, useState } from "react";
import { Link, Route, Switch, useHistory } from "react-router-dom";
import styled from "styled-components";
import { TeacherService } from "../../services/teacher";
import { AssignmentCard } from "./AssignmentCard";
import { AddAssignment } from "./AddAssignment";
import {useSelector} from "react-redux";
import {StoreState} from "../../redux";

const AddButton = styled.button`
  position: relative;
  border: none;
  display: block;
  background: none;
  color: green;
  padding: 10px 15px;
  border: 1px solid green;
  margin-left: auto;
  margin-bottom: 30px;
`;

export interface Assignment {
  id: number;
  teacher_id: number;
  title: string;
  description: string;
  username: string;
}

export const H1 = styled.h1`
  padding-top: 30px;
  padding-bottom: 20px;
`;

export const AssignmentList: React.FC = () => {
  const user = useSelector((state: StoreState) => state.auth.user)!;
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const history = useHistory();

  useEffect(() => {
    (async () => {
      const teacherService = new TeacherService(true);
      const res = await teacherService.getAssignments();

      if (!res) {
        return;
      }

      const { assignments } = res.data;
      setAssignments(assignments);
    })();
  }, []);

  const deleteAssignment = async (val: number) => {
    const teacherService = new TeacherService(true);
    const res = await teacherService.deleteAssignment(val);

    if (!res) {
      return;
    }
    if (res.status == 200) {
      setAssignments(assignments.filter((el) => el.id !== val));
    }
  };

  const addAssignment = async (title: string, description: string) => {
    const teacherService = new TeacherService(true);
    const res = await teacherService.createAssignment(title, description);

    const { assignment } = res?.data;

    if (assignment) {
      setAssignments([...assignments, assignment]);
    }

    history.push("/dashboard/assignment");
  };

  return (
    <Switch>
      <Route exact path="/dashboard/assignment">
        <div>
          <Link to="/dashboard/assignment/add">
            {" "}
            { user.role === "TEACHER" &&  <AddButton>Add</AddButton> }
          </Link>
          {assignments.map((el) => {
            return <AssignmentCard key={el.id} {...el} deleteAssignment={ user.role == "TEACHER" ? deleteAssignment : undefined  } />;
          })}
          {assignments.length === 0 && <h3>Can't find any assignment</h3>}
        </div>
      </Route>

      <Route exact path="/dashboard/assignment/add">
        <AddAssignment addAssignment={addAssignment} />
      </Route>
    </Switch>
  );
};
