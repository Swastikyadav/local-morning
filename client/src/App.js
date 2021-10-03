import { useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Home from "./components/Home";

function App() {
  const [user, setUser] = useState(null);

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

  const privateRoutes = () => {};

  return (
    <>
      {user && localStorage.token ? privateRoutes() : publicRoutes()}
    </>
  );
}

export default App;