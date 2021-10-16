import { useState } from "react";
import { toast } from "react-toastify";

import API from "../utils/API";

import "../style/resetPassForm.css";

function FindAccount() {
  const [email, setEmail] = useState("");

  const notifyError = (message) => toast.error(message);
  const notifySuccess = (message) => toast.success(message);

  const handleChange = (event) => {
    setEmail(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    API.postForgotPassword({email})
      .then(res => {
        const { success, message } = res;

        if(success) {
          notifySuccess(message);
        } else {
          notifyError(message);
        }
      })
  }

  return (
    <div className="resetPassDiv">
      <h1>You will recieve a password reset link in you email.</h1>

      <form className="auth-form" onSubmit={handleSubmit}>
        <input type="email" placeholder="Registered Email" onChange={handleChange} value={email} />
        <input className="submit-btn" type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default FindAccount;