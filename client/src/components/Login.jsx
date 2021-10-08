import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { GoogleOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";

import "../style/authForm.css";
import API from "../utils/API";

function Login({ updateUser }) {
  const history = useHistory();
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
      .then(user => {
        const { jwtToken, message, success } = user;

        if(success) {
          localStorage.setItem("token", jwtToken);
          updateUser(user);
          notifySuccess("You are logged in successfully");
          history.push("/");
        } else {
          notifyError(message);
        }
      })
      .finally(() => {
        setLoading(false);
      });
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
        <Link to="#">Forgotten Password?</Link>
        <Link to="/auth/register">Create New Account!</Link>
      </span>

      <hr />

      <Link to="#">
        <button className="google-auth-btn">
          <GoogleOutlined className="google-icon" /> Login With Google
        </button>
      </Link>
    </form>
  );
}

export default Login;