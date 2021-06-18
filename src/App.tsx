import { Navbar } from "./components/layout/AppBar";
import React, { useEffect } from "react";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import { HomeScreen } from "./screens/Home";
import { LoginScreen } from "./screens/Login";
import { RegisterScreen } from "./screens/Register";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { DispatchType, login, store, StoreState } from "./redux";
import { LogoutScreen } from "./screens/Logout";
import { UserService } from "./services/user";

const Main = styled.div`
  width: 70%;
  margin: 3vh auto;
`;

function App() {
  const dispatch = useDispatch<DispatchType>();
  const isAuthenticed = useSelector((state: StoreState) => state.auth.isAuthenticated);
  const history = useHistory();

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("token");

      if (token) {
        const userService = new UserService(true);
        const res = await userService.getProfile();

        if (!res) {
          return;
        }
        const { user } = res.data;
        dispatch(login(user));
      } else {
        history.push("/login");
      }
    })();
  }, []);

  return (
    <Main>
      <Navbar />
      <Switch>
        <Route exact path="/">
          {isAuthenticed ? <Redirect to="/dashboard" /> : <Redirect to="/login" />}
        </Route>
        <Route path="/dashboard" component={HomeScreen} />
        <Route exact path="/login" component={LoginScreen} />
        <Route exact path="/register" component={RegisterScreen} />
        <Route exact path="/logout" component={LogoutScreen} />
      </Switch>
    </Main>
  );
}

export default App;
