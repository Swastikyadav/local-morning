import { Link } from "react-router-dom";
import { GoogleOutlined } from "@ant-design/icons";

import "../style/authForm.css";

function Login() {
  return (
    <form className="auth-form">
      <input placeholder="Email Address" type="email" autoFocus />
      <input placeholder="Password" type="password" />

      <input className="submit-btn" type="submit" value="Log In" />

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