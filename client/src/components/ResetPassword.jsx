import { useState } from "react";
import { toast } from "react-toastify";
import { useParams, useHistory } from "react-router-dom";

import API from "../utils/API";

function ResetPassword() {
  const history = useHistory();
  const { user_id } = useParams();
  const [resetPasswordData, setResetPasswordData] = useState({
    newPassword: "",
    confirmNewPassword: ""
  });

  const notifyError = (message) => toast.error(message);
  const notifySuceess = (message) => toast.success(message);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setResetPasswordData({
      ...resetPasswordData,
      [name]: value
    });
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    API.patchResetPassword(user_id, resetPasswordData)
      .then(res => {
        const { message, success } = res;

        if(success) {
          notifySuceess(message);
          history.push("/");
        } else {
          notifyError(message);
        }
      })
  }

  return (
    <div className="resetPassDiv">
      <h1>Reset Password</h1>

      <form className="auth-form" onSubmit={handleSubmit}>
        <input name="newPassword" type="password" placeholder="New Password" onChange={handleChange} value={resetPasswordData.newPassword} />
        <input name="confirmNewPassword" type="text" placeholder="Confirm Password" onChange={handleChange} value={resetPasswordData.confirmNewPassword} />

        <input className="submit-btn" type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default ResetPassword;