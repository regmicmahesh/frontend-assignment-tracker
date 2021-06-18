import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Center, Container, FormError, FormGroup, FormHeading, Input, SubmitButton } from "../components/form.style";
import { DispatchType, login } from "../redux";
import AuthService from "../services/auth";

type Error = {
  username?: string;
  password?: string;
  role?: string;
  extraError?: string;
};

export const LoginScreen = () => {
  const dispatch = useDispatch<DispatchType>();
  const history = useHistory();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<Error>({});

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

  const onLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const authService = new AuthService();

    const res = await authService.login(username, password);

    if (!res) {
      return;
    }

    if (res.status == 400) {
      if (res.data.error) {
        setError({ ...error, extraError: res.data.error });
      }
      if (res.data.errors) {
        console.log(res.data.errors);
        const { errors } = res.data;

        const newErrors = errors.reduce(
          (acc: any, curr: any) => {
            return { ...acc, [curr.key]: curr.message };
          },
          { ...error }
        );
        setError(newErrors);
      }
    } else if (res.status === 200) {
      const {user, access_token} = res.data;
      dispatch(login(user));
      localStorage.setItem("token", access_token);
      history.push("/");
    }
  };

  return (
    <Center>
      <Container>
        <form onSubmit={onLogin}>
          <FormHeading>Login to Continue</FormHeading>

          <FormGroup>
            <Input placeholder="Username" name="username" value={username} required onChange={onValueChange} />
            <FormError>{error.username}</FormError>
          </FormGroup>

          <FormGroup>
            <Input
              placeholder="Password"
              name="password"
              type="password"
              value={password}
              required
              onChange={onValueChange}
            />
            <FormError>{error.password}</FormError>
          </FormGroup>

          <SubmitButton type="submit">Login</SubmitButton>
          <FormError>{error.extraError}</FormError>
        </form>
      </Container>
    </Center>
  );
};
