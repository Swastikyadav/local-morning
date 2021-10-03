import { Link } from "react-router-dom";
import { GoogleOutlined } from "@ant-design/icons";

import "../style/authForm.css";

function Register() {
  return (
    <form className="auth-form">
      <input placeholder="Email Address" type="email" autoFocus />
      <input placeholder="Username" type="text" />
      <input placeholder="Password" type="password" />

      <input className="submit-btn" type="submit" value="Create New Account" />

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
  );
}

export default Register;