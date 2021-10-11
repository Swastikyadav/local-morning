import { useState, useEffect } from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import UserContext from "./UserContext";

import API from "./utils/API";

// Public components
import Home from "./components/Home";
import Oauth from "./components/Oauth";

// Private components
import Layout from "./components/Layout";
import MobileNavigation from "./components/MobileNavigation";

import 'react-toastify/dist/ReactToastify.min.css';

function App(props) {
  const [user, setUser] = useState(null);
  const [mobileView, setMobileView] = useState(window.matchMedia("(max-width: 768px)").matches);

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 768px)");
    function updatemobileView(mql) {
      setMobileView(mql.matches);
      if(mobileView) {
        props.location.pathname === "/dashboard/posts" ?
        props.history.push("/dashboard") :
        props.history.push(props.location.pathname);
      } else {
        props.location.pathname === "/dashboard" ?
        props.history.push("/dashboard/posts") :
        props.history.push(props.location.pathname);
      }
    }

    mql.addListener(updatemobileView);

    return () => mql.removeListener(updatemobileView);
  }, [mobileView, props]);

  useEffect(() => {
    // Move outside and utilize useCallback
    API.getCurrentUser(localStorage.token || "")
      .then(res => {
        const { user, success } = res;

        if(success) {
          updateUser(user);
        }
      })
  }, []);

  const updateUser = (user) => {
    setUser(user);
  }

  // Use context api for logOutUser and user
  const logOutUser = () => {
    updateUser(null);
    localStorage.clear();
    props.history.push("/");
  }

  const publicRoutes = () => {
    return(
      <Switch>
        <Route path="/auth">
          <Home updateUser={updateUser} />
        </Route>
        <Route path="/oAuth">
          <Oauth updateUser={updateUser} />
        </Route>
        <Route path="/">
          <Redirect to="/auth" />
        </Route>
      </Switch>
    );
  };

  const privateRoutes = () => {
    return(
      <Switch>
        <Route path="/dashboard">
          <Layout />
        </Route>
        <Route path="/">
          {mobileView ? <Redirect to="/dashboard/posts" /> : <Redirect to="/dashboard" />}
        </Route>
      </Switch>
    );
  };

  return (
    <UserContext.Provider value={{user, logOutUser}}>
      {user || localStorage.token ? (
        <>
          <MobileNavigation />
          {user && privateRoutes()}
        </>
      ) : publicRoutes()}
      <ToastContainer />
    </UserContext.Provider>
  );
}

export default withRouter(App);