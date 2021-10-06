import { useState, useEffect } from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";

import Home from "./components/Home";
import Layout from "./components/Layout";
import MobileNavigation from "./components/MobileNavigation";

function App(props) {
  const [user, setUser] = useState(null);
  const [mobileView, setMobileView] = useState(window.matchMedia("(max-width: 768px)").matches);

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 768px)");
    function updatemobileView(mql) {
      setMobileView(mql.matches);
      if(mobileView) {
        props.history.push("/dashboard");
      } else {
        props.history.push("/dashboard/posts");
      }
    }

    mql.addListener(updatemobileView);

    return () => mql.removeListener(updatemobileView);
  }, [mobileView, props]);

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
          {mobileView ? <Redirect to="/dashboard/posts" /> : <Redirect to="/dashboard" />}
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