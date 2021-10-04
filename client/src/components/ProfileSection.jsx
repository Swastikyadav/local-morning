import { Link } from "react-router-dom";
import { AlignCenterOutlined, LikeOutlined, SettingOutlined, LogoutOutlined } from "@ant-design/icons";

function Profile() {
  return (
    <section className="profile-card">
      <div className="profile-cover-image"></div>
      <img src="https://pbs.twimg.com/profile_images/1411339822942220294/cB2H_0Rm_400x400.jpg" className="profile-pic" alt="profile-pic"/>
      <h2 className="profile-name">Swastik Yadav</h2>
      <p className="profile-bio">Software Engineer, Full-Stack web development blogs, tutorials, and courses at swastikyadav.com.</p>
      
      <hr />

      <div className="follow-count"><span>Following:</span> <span style={{color: "blue"}}>115</span></div>
      <div className="follow-count"><span>Followers:</span> <span style={{color: "blue"}}>550</span></div>

      <hr />

      <Link to="#"><p><AlignCenterOutlined /> My Posts</p></Link>
      <Link to="#"><p><LikeOutlined /> Liked Posts</p></Link>
      <Link to="#"><p><SettingOutlined /> Settings</p></Link>
      <Link to="#"><p><LogoutOutlined /> Logout</p></Link>
    </section>
  );
}

export default Profile;