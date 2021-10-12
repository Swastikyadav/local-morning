import { Switch, Route, Redirect } from "react-router-dom";

import Register from "./register";
import Login from "./Login";

import "../style/home.css";

function Home({ updateUser }) {
  return (
    <div className="home">
      <span className="home-text">
        <h1>Local Morning</h1>
        <h3>Share your thoughts and remain updated with the latest news.</h3>
      </span>

      <Switch>
        <Route path="/auth/register" component={Register} />
        <Route path="/auth/login" component={Login} />
        <Route path="/auth">
          <Redirect to="auth/login" />
        </Route>
      </Switch>
    </div>
  );
}

export default Home;