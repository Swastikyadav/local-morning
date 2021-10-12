import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

import UserContext from "../UserContext";
import API from "../utils/API";

function PasswordSettings() {
  const history = useHistory();
  const { updateUser } = useContext(UserContext);

  const [passwordData, setPasswordData] = useState({
    newPassword: "",
    confirmNewPassword: "",
    currentPassword: ""
  });
  const [loading, setLoading] = useState(false);

  const notifyError = (message) => toast.error(message);
  const notifySuccess = (message) => toast.success(message);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setPasswordData({
      ...passwordData,
      [name]: value
    });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    API.patchUpdatePassword(passwordData)
      .then(res => {
        const { success, updatedUser, message } = res;

        if(success) {
          notifySuccess("Password updated successfully");
          updateUser(updatedUser);
          history.push("/");
        } else {
          notifyError(message);
          setLoading(false);
        }
      })
  }

  return (
    <>
      <h4>Update Password</h4>

      <form className="change-password-form" onSubmit={handleSubmit}>
        <label htmlFor="new-password">New Password</label>
        <input id="new-password" name="newPassword" className="input-focus" type="password" placeholder="New Password" value={passwordData.newPassword} onChange={handleChange} />

        <label htmlFor="confirm-new-password">Confirm New Password</label>
        <input id="confirm-new-password" name="confirmNewPassword" className="input-focus" type="text" placeholder="Confirm-New Password" value={passwordData.confirmNewPassword} onChange={handleChange} />

        <label htmlFor="current-password">Verify Current Password</label>
        <input id="current-password" name="currentPassword" className="input-focus" type="password" placeholder="Current Password" value={passwordData.currentPassword} onChange={handleChange} />

        <input type="submit" value={loading ? "Updating..." : "Change Password"} />
      </form>
    </>
  );
}

export default PasswordSettings;