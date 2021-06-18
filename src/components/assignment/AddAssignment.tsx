import React, { useState } from "react";
import { FormGroup, Input, SubmitButton, TextArea } from "../form.style";
import { H1  } from "./AssignmentList";

export interface IAddAssignmentProps {
  addAssignment: (title: string, description: string) => Promise<void>;
}

export const AddAssignment: React.FC<IAddAssignmentProps> = ({ addAssignment }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addAssignment(title, description);
  };

  return (
    <>
      <H1> Add Assignment </H1>
      <form onSubmit={onSubmit}>
        <FormGroup>
          <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <h3> Description </h3>
          <TextArea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        </FormGroup>
        <SubmitButton type="submit">Add</SubmitButton>
      </form>
    </>
  );
};
