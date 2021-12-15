import { Switch, Route } from "react-router-dom";

import { AuthProvider } from "./contexts/AuthContext";
import { NotificationProvider } from "./contexts/NotificationContext";

import Navigation from "./components/Navigation";
import Home from "./components/Home";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Register from "./components/Register";
import AboutUs from "./components/AboutUs";
import Details from "./components/Details";
import Edit from "./components/Edit";
import Create from "./components/Create";
import Catalog from "./components/Catalog";
import Dashboard from "./components/Dashboard";
import ErrorBoundary from "./components/Common/ErrorBoundary";
import Notification from "./components/Common/Notification";
import { isAuth } from "./hoc/isAuth";
import "./scss/app.scss";

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <NotificationProvider>
          <Navigation />
          <Notification />
          <main className="main-container">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/logout" component={Logout} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/about-us" component={AboutUs} />
              <Route path="/details/:eventId" component={Details} />
              <Route path="/catalog" component={Catalog} />
              <Route path="/edit/:eventId" component={isAuth(Edit)} />
              <Route path="/create" component={isAuth(Create)} />
              <Route path="/dashboard" component={isAuth(Dashboard)} />
            </Switch>
          </main>
          <footer>
            <p> &copy; Aevent All Rights Reserved</p>
          </footer>
        </NotificationProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
