import { Link } from "react-router-dom";
import { Input } from "antd";

import "../style/settingsPage.css";

const { TextArea } = Input;

function Settings() {
  return (
    <div className="settings-page box-shadow">
      <Link to="/"><p>{`<<< Go back to home`}</p></Link>

      <h4>Update Profile</h4>
      <form className="settings-form">
        <label htmlFor="username">UserName: </label>
        <input id="username" className="input-focus" type="text" placeholder="UserName" autoFocus />

        <label htmlFor="bio">Bio: </label>
        <TextArea id="bio" className="textarea-focus" placeholder="Tell us about yourself ..." autoSize />

        <label htmlFor="profile-pic">Select Profile Picture: </label>
        <input id="profile-pic" className="input-focus" type="file" />

        <input type="submit" value="Update Profile" />
      </form>

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