import { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { GoogleOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";

import API from "../utils/API";
import UserContext from "../UserContext";

import "../style/authForm.css";

function Login() {
  const history = useHistory();
  const { updateUser } = useContext(UserContext);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const notifyError = (message) => toast.error(message);
  const notifySuccess = (message) => toast.success(message);

  const handleChange = (event) => {
    const { name, value } = event.target;
    
    setLoginData({
      ...loginData,
      [name]: value
    });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    API.postLogin(loginData)
      .then(loggedInUser => {
        const { jwtToken, message, success, user } = loggedInUser;

        if(success) {
          localStorage.setItem("token", jwtToken);
          updateUser(user);
          notifySuccess("You logged in successfully");
          history.push("/");
        } else {
          notifyError(message);
          setLoading(false);
        }
      })
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <input
        name="email"
        placeholder="Email Address"
        type="email"
        value={loginData.email}
        onChange={handleChange}
        autoFocus
      />
      <input
        name="password"
        placeholder="Password"
        type="password"
        value={loginData.password}
        onChange={handleChange}
      />

      <input className="submit-btn" type="submit" value={loading ? "Loading..." : "Log In"} />

      <span className="links">
        <Link to="/findAccount">Forgotten Password?</Link>
        <Link to="/auth/register">Create New Account!</Link>
      </span>

      <hr />

      <button
        type="button"
        className="google-auth-btn"
        onClick={() => {
          window.location.href = window.location.port ? "http://localhost:5000/api/v1/oAuth/google" : window.location.origin+"/api/v1/oAuth/google";
        }}
      >
        <GoogleOutlined className="google-icon" /> Login With Google
      </button>
    </form>
  );
}

export default Login;