import styled from "styled-components";

export const Center = styled.div`
  display: block;
  width: 30%;
  margin: auto;
  margin-top: 20vh;
`;

export const FormError = styled.p`
  color: red;
  margin: 5px 0px;
  font-size: 0.8rem;
`;

export const Container = styled.div`
  width: 100%;
  margin: auto;
`;

export const FormHeading = styled.h3`
  margin-bottom: 30px;
`;

export interface IFormGroup {
  selected?: boolean;
}

export const FormGroup = styled.p<IFormGroup>`
  margin: 5px 0px;
  padding: 10px;
  border: 1px solid ${(props) => (props.selected ? "green" : "transparent")};
`;

export const Input = styled.input`
  border: none;
  padding: 5px;
  width: 100%;
  border-bottom: 1px solid black;

  &:focus {
    border: none;
    outline: none;
    border-bottom: 2px solid black;
  }
`;

interface ISubmitButton {
  color?: string;
}

export const SubmitButton = styled.button<ISubmitButton>`
  width: 100%;
  outline: none;
  border: none;
  padding: 10px 5px;
  background-color: ${(props) => (props.color ? props.color : "#a1a1a1")};
`;

export const RadioButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: 5px;
  height: 90px;
`;
