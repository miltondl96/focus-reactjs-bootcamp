import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Employees from "./pages/Employees/index.jsx";
import Disabilities from "./pages/Disabilities/index.jsx";
import Login from "./pages/Login/index.jsx";
import { useAuth } from "./use-auth.js";

export default function App() {
  const auth = useAuth();
  return (
    <div>
      {!auth.isLoading && (
        <Router>
          <Switch>
            <PublicRoute exact path="/login">
              <Login />
            </PublicRoute>
            <PrivateRoute exact path="/employees">
              <Employees />
            </PrivateRoute>
            <PrivateRoute exact path="/disabilities">
              <Disabilities />
            </PrivateRoute>
            <Redirect to="/employees" />
          </Switch>
        </Router>
      )}
    </div>
  );
}

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
function PrivateRoute({ children, ...rest }) {
  const auth = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

function PublicRoute({ children, ...rest }) {
  const auth = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        !auth.user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/employees",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
