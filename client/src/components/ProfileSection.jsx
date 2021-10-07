import { Link } from "react-router-dom";
import { AlignCenterOutlined, LikeOutlined, SettingOutlined, LogoutOutlined, HomeOutlined } from "@ant-design/icons";

import "../style/profileSection.css";

function Profile({style}) {
  return (
    <aside className="profile-section" style={style}>
    <section className="profile-card">
      <div className="profile-cover-image"></div>
      <img src="https://pbs.twimg.com/profile_images/1411339822942220294/cB2H_0Rm_400x400.jpg" className="profile-pic" alt="profile-pic"/>
      <h2 className="profile-name">Swastik Yadav</h2>
      <p className="profile-bio">Software Engineer, Full-Stack web development blogs, tutorials, and courses at swastikyadav.com.</p>
      
      <hr />

      <div className="follow-count"><span>Following:</span> <span style={{color: "blue"}}>115</span></div>
      <div className="follow-count"><span>Followers:</span> <span style={{color: "blue"}}>550</span></div>

      <hr />

      <Link to="/"><p><HomeOutlined /> Home</p></Link>
      <Link to="/dashboard/profile/myposts"><p><AlignCenterOutlined /> My Posts</p></Link>
      <Link to="/dashboard/profile/likedposts"><p><LikeOutlined /> Liked Posts</p></Link>
      <Link to="/dashboard/settings"><p><SettingOutlined /> Settings</p></Link>
      <Link to="#"><p><LogoutOutlined /> Logout</p></Link>
    </section>
    </aside>
  );
}

export default Profile;