import { Link } from "react-router-dom";

import ProfileSettings from "./ProfileSettings";
import PasswordSettings from "./PasswordSettings";

import "../style/settingsPage.css";

function Settings() {
  return (
    <div className="settings-page box-shadow">
      <Link to="/"><p>{`<<< Go back to home`}</p></Link>

      <ProfileSettings />

      <PasswordSettings />      
    </div>
  );
}

export default Settings;