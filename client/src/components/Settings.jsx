import { Link } from "react-router-dom";

import ProfileSettings from "./ProfileSettings";

import "../style/settingsPage.css";

function Settings() {
  return (
    <div className="settings-page box-shadow">
      <Link to="/"><p>{`<<< Go back to home`}</p></Link>

      <ProfileSettings />

      <h4>Update Password</h4>

      <form className="change-password-form">
        <label htmlFor="new-password">New Password</label>
        <input id="new-password" className="input-focus" type="password" placeholder="New Password" />

        <label htmlFor="confirm-new-password">Confirm New Password</label>
        <input id="confirm-new-password" className="input-focus" type="text" placeholder="Confirm-New Password" />

        <label htmlFor="current-password">Verify Current Password</label>
        <input id="current-password" className="input-focus" type="password" placeholder="Current Password" />

        <input type="submit" value="Change Password" />
      </form>
    </div>
  );
}

export default Settings;