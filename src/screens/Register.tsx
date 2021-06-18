import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { DispatchType } from "../redux";
import { login } from "../redux";
import AuthService from "../services/auth";
import {
  Center,
  Container,
  FormError,
  FormGroup,
  FormHeading,
  Input,
  RadioButtonGroup,
  SubmitButton,
} from "../components/form.style";
import { useHistory } from "react-router-dom";

type Error = {
  username?: string;
  password?: string;
  role?: string;
};

type TChoice = "STUDENT" | "TEACHER";

export const RegisterScreen = () => {
  const dispatch = useDispatch<DispatchType>();
  const history = useHistory();

  const [error, setError] = useState<Error>({});

  const [role, setRole] = useState<TChoice>("STUDENT");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError({});
    switch (e.target.name) {
      case "username":
        setUsername(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
    }
  };

  const onRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const authService = new AuthService();

    const res = await authService.register(username, password, role);

    if (!res) {
      setError({ ...error, role: "No Internet" });
    }

    if (res) {
      if (res.status == 400) {
        const { errors } = res.data;

        const newErrors = errors.reduce((acc: any, curr: any) => {
          return { ...acc, [curr.key]: curr.message };
        }, {});

        setError(newErrors);
      } else if (res.status == 200) {
        const { user, access_token } = res.data;

        localStorage.setItem("token", access_token);

        dispatch(login(user));

        history.push("/");
      }
    }
  };

  return (
    <Center>
      <Container>
        <FormHeading>Register to Continue</FormHeading>

        <form onSubmit={onRegister}>
          <FormGroup>
            <Input
              placeholder="Username"
              required
              name="username"
              value={username}
              onChange={onValueChange}
            />
            <FormError> {error.username}</FormError>
          </FormGroup>

          <FormGroup>
            <Input
              placeholder="Password"
              type="password"
              name="password"
              required
              value={password}
              onChange={onValueChange}
            />
            <FormError> {error.password}</FormError>
          </FormGroup>

          <RadioButtonGroup>
            <FormGroup
              selected={role == "STUDENT"}
              onClick={() => setRole("STUDENT")}
            >
              Student
            </FormGroup>
            <FormGroup
              selected={role == "TEACHER"}
              onClick={() => setRole("TEACHER")}
            >
              Teacher
            </FormGroup>
          </RadioButtonGroup>
          {error.role && <FormError> {error.role}</FormError>}

          <SubmitButton type="submit">Register</SubmitButton>
        </form>
      </Container>
    </Center>
  );
};
