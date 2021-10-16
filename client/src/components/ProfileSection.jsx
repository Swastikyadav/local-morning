import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AlignCenterOutlined, LikeOutlined, SettingOutlined, LogoutOutlined, HomeOutlined } from "@ant-design/icons";

import UserContext from "../UserContext";

import "../style/profileSection.css";

function Profile({style, userProfileData}) {
  const {user, logOutUser} = useContext(UserContext);

  const [userProfile, setUserProfile] = useState({});

  useEffect(() => {
    setUserProfile(userProfileData || user);
  }, [user, userProfileData]);

  return (
    <aside className="profile-section" style={style}>
    <section className="profile-card">
      <div className="profile-cover-image"></div>
      <img src={userProfile.avatar} className="profile-pic" alt="profile-pic"/>
      <h2 className="profile-name">{userProfile.name}</h2>
      <p className="profile-bio">{userProfile.bio || "Update your bio in settings"}</p>
      
      <hr />

      <div className="follow-count"><span>Following:</span> <span style={{color: "blue"}}>{userProfile.following || 115}</span></div>
      <div className="follow-count"><span>Followers:</span> <span style={{color: "blue"}}>{userProfile.followers || 550}</span></div>

      <hr />

      <Link className="nav-item" to="/"><p><HomeOutlined /> Home</p></Link>
      {!userProfileData && <>
        <Link className="nav-item" to="/dashboard/profile/myposts"><p><AlignCenterOutlined /> My Posts</p></Link>
        <Link className="nav-item" to="/dashboard/profile/likedposts"><p><LikeOutlined /> Liked Posts</p></Link>
        <Link className="nav-item" to="/dashboard/settings"><p><SettingOutlined /> Settings</p></Link>
        <p className="nav-item" onClick={logOutUser}><LogoutOutlined /> Logout</p>
      </>}
    </section>
    </aside>
  );
}

export default Profile;