import { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import useLocalStorage from "./hooks/useLocalStorage";

import * as authService from "./services/authService";
import { AuthContext } from "./contexts/AuthContext";

import Navigation from "./components/Navigation";
import Home from "./components/Home";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Register from "./components/Register";
import Details from "./components/Details";
import Create from "./components/Create";
import Catalog from "./components/Catalog";

import "./scss/app.scss";

const initialAuthState = {
  _id: "",
  email: "",
  accessToken: "",
  firstName: "",
  lastName: "",
};

function App() {
  const [user, setUser] = useLocalStorage("user", initialAuthState);

  const login = (authData) => {
    setUser(authData);
  };

  const logout = () => {
    setUser(initialAuthState);
  };

  return (
    <>
      <AuthContext.Provider value={{ user, login, logout }}>
        <Navigation user={user} />
        <main className="main-container">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/logout">
              <Logout />
            </Route>
            <Route exact path="/register" component={Register} />
            <Route path="/details/:eventId" component={Details} />
            <Route path="/create" component={Create} />
            <Route path="/catalog" component={Catalog} />
          </Switch>
        </main>
      </AuthContext.Provider>
      <footer>
        <p> &copy; Aevent All Rights Reserved</p>
      </footer>
    </>
  );
}

export default App;
