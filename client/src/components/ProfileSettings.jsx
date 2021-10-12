import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { Input } from "antd";

import UserContext from "../UserContext";
import API from "../utils/API";

const { TextArea } = Input;

function ProfileSettings() {
  const history = useHistory();
  const {user, updateUser} = useContext(UserContext);
  const [userProfile, setUserProfile] = useState({
    name: user.name,
    bio: user.bio,
    avatar: null
  });
  const [loading, setLoading] = useState(false);

  const notifyError = (message) => toast.error(message);
  const notifySuccess = (message) => toast.success(message);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setUserProfile({
      ...userProfile,
      [name]: value
    });
  }

  const handleFileChange = (event) => {
    setUserProfile({
      ...userProfile,
      avatar: event.target.files[0]
    });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("name", userProfile.name);
    formData.append("bio", userProfile.bio);
    formData.append("avatar", userProfile.avatar);
    
    API.patchUserProfile(user._id, formData)
      .then(res => {
        const { success, updatedUser, message } = res;

        if(success) {
          notifySuccess("User updated successfully");
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
      <h4>Update Profile</h4>
      <form className="settings-form" onSubmit={handleSubmit}>
        <label htmlFor="username">UserName: </label>
        <input id="username" name="name" className="input-focus" type="text" placeholder="UserName" onChange={handleChange} value={userProfile.name} autoFocus />

        <label htmlFor="bio">Bio: </label>
        <TextArea id="bio" name="bio" className="textarea-focus" placeholder="Tell us about yourself ..." onChange={handleChange} value={userProfile.bio} autoSize />

        <label htmlFor="profile-pic">Select Profile Picture: </label>
        <input id="profile-pic" name="avatar" className="input-focus" type="file" onChange={handleFileChange} />

        <input type="submit" value={loading ? "Updating..." : "Update Profile"} />
      </form>
    </>
  );
}

export default ProfileSettings;