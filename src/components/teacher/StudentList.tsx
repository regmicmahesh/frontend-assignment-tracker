import React, { useEffect, useState } from "react";
import { TeacherService } from "../../services/teacher";
import styled from "styled-components";

export interface Student {
  id: number;
  username: string;
  profile_picture: string | null;
  teacher_id: number;
  role: "STUDENT" | "TEACHER";
  teacher_code: string | null;
}

export const Table = styled.table`
  border: 1px solid black;
  border-collapse: collapse;
  width: 100%;
`;

const SmallImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
`;
export const Td = styled.td`
  text-align: center;
  border: 1px solid black;
  border-left: none;
  border-right: none;
  padding: 5px;
  border-collapse: collapse;
`;

export const Th = styled.th`
  padding: 10px 0px;
  border: 1px solid black;
  border-left: none;
  border-right: none;
`;

const Button = styled.button`
  padding: 10px;
  background: rgb(240, 240, 240);
  color: red;
  font-weight: bold;
  border: none;
`;
export const StudentList: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  useEffect(() => {
    (async () => {
      const teacherService = new TeacherService(true);
      const res = await teacherService.getStudents();
      if (!res) {
        return;
      }

      const { users } = res.data;

      setStudents(users);
    })();
  }, []);

  const deleteStudent = async (id: number) => {
    const teacherService = new TeacherService(true);
    const res = await teacherService.deleteStudent(id);
    if (!res) {
      return;
    }

    const newStudents = students.filter((el) => el.id !== id);
    setStudents(newStudents);
  };

  return (
    <div>
      <Table>
        <thead>
          <tr>
            <Th>Profile Picture </Th>
            <Th>Username</Th>
            <Th>Role</Th>
            <Th>Actions</Th>
          </tr>
        </thead>

        <tbody>
          {students.map((el) => {
            return (
              <tr key={el.id}>
                <Td>
                  {" "}
                  <SmallImage src="https://www.theportlandclinic.com/wp-content/uploads/2019/07/Person-Curtis_4x5-e1564616444404-300x300.jpg" />{" "}
                </Td>
                <Td> {el.username} </Td>
                <Td> {el.role} </Td>
                <Td>
                  {" "}
                  <Button onClick={deleteStudent.bind(this, el.id)}> Remove Student </Button>{" "}
                </Td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};
