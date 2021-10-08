import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { GoogleOutlined, LoadingOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";

import API from "../utils/API";

import "../style/authForm.css";
import 'react-toastify/dist/ReactToastify.min.css';

function Register() {
  const history = useHistory();
  const [userData, setUserData] = useState({
    email: "",
    name: "",
    password: "",
  });
  const [loading, setLoading] = useState(false); 

  const notifyError = (message) => toast.error(message);
  const notifySuccess = (message) => toast.success(message);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setUserData({
      ...userData,
      [name]: value
    });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    API.postSignup(userData)
      .then(res => {
        const { message, success } = res;

        if(success) {
          notifySuccess("Signup successful, Please Login");
          history.push("/auth/login");
        } else {
          notifyError(message);
        }
      })
      .finally(() => {
        setLoading(false);
      })
  }

  return (
    <>
      <form className="auth-form" onSubmit={handleSubmit}>
        <input
          name="email"
          placeholder="Email Address"
          type="email"
          autoFocus
          value={userData.email}
          onChange={handleChange}
        />
        <input
          name="name"
          placeholder="Username"
          type="text"
          value={userData.name}
          onChange={handleChange}
        />
        <input
          name="password"
          placeholder="Password"
          type="password"
          value={userData.password}
          onChange={handleChange}
        />

        <input className="submit-btn" type="submit" value={loading ? "Loading..." : "Create New Account"} />

        <span className="links">
          <Link to="/auth/login">Login to existing account!</Link>
        </span>

        <hr />

        <Link to="#">
          <button className="google-auth-btn">
            <GoogleOutlined className="google-icon" /> Login With Google
          </button>
        </Link>
      </form>
    </>
  );
}

export default Register;