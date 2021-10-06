import { useState, useEffect } from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";

import Home from "./components/Home";
import Layout from "./components/Layout";
import MobileNavigation from "./components/MobileNavigation";

function App(props) {
  const [user, setUser] = useState(null);
  const [screenSize, setScreenSize] = useState(window.innerWidth);

  useEffect(() => {
    function updateScreenSize() {
      setScreenSize(window.innerWidth);
      if(screenSize >= 769) {
        (props.location.pathname !== "/dashboard") && props.history.push("/dashboard");
      } else {
        (props.location.pathname !== "/dashboard/posts") && props.history.push("/dashboard/posts");
      }
    }

    window.addEventListener("resize", updateScreenSize);

    return () => window.removeEventListener("resize", updateScreenSize);
  }, [screenSize, props]);

  const publicRoutes = () => {
    return(
      <Switch>
        <Route path="/auth" component={Home} />
        <Route path="/">
          <Redirect to="/auth" />
        </Route>
      </Switch>
    );
  };

  const privateRoutes = () => {
    return(
      <Switch>
        <Route path="/dashboard" component={Layout} />
        <Route path="/">
          {screenSize > 768 ? <Redirect to="/dashboard" /> : <Redirect to="/dashboard/posts" />}
        </Route>
      </Switch>
    );
  };

  return (
    <>
      {!user && !localStorage.token ? (
        <>
          <MobileNavigation />
          {privateRoutes()}
        </>
      ) : publicRoutes()}
    </>
  );
}

export default withRouter(App);