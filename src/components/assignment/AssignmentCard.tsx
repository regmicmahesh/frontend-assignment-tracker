import React from "react";
import styled from "styled-components";

const Assignment = styled.div`
  width: 90%;
  text-align: justify;
  margin-bottom: 30px;
  padding-bottom: 10px;
  border-bottom: 2px solid black;
`;

export const H3 = styled.h3`
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const DeleteButton = styled.button`
  cursor: pointer;
  background: none;
  padding: 10px 15px;
  color: red;
  font-weight: bold;
  border: 1px solid red;
`;

const ViewButton = styled.button`
  cursor: pointer;
  background: none;
  padding: 10px 15px;
  color: blue;
  font-weight: bold;
  border: 1px solid blue;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 5px;
`;
export interface IAssignmentProps {
  id: number;
  title: string;
  description: string;
  deleteAssignment: any;
  viewAssignment?: any;
}

export const AssignmentCard: React.FC<IAssignmentProps> = ({
  id,
  title,
  description,
  deleteAssignment,
  viewAssignment,
}) => {
  return (
    <Assignment>
      <H3>
        Title: {title}
        <ButtonGroup>
          {viewAssignment && <ViewButton>View Submissions</ViewButton>}
          {deleteAssignment && <DeleteButton onClick={deleteAssignment.bind(this, id)}>Delete</DeleteButton>}
        </ButtonGroup>
      </H3>
      <p>{description}</p>
    </Assignment>
  );
};
