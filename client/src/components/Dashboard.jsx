import { Input } from "antd";
import { PictureOutlined } from "@ant-design/icons";

import ProfileSection from "./ProfileSection";
import PostFeed from "./PostFeed";

import "../style/dashboard.css";

const { TextArea } = Input;

function Dashboard() {
  return (
    <div className="dashboard">
      <ProfileSection />
      <main className="post-section">
        <div className="post-form">
          <img src="https://pbs.twimg.com/profile_images/1411339822942220294/cB2H_0Rm_400x400.jpg" className="profile-pic" alt="profile-pic"/>
          <div className="textarea-container">
            <TextArea placeholder="Share your thoughts..." autoSize />
            <p className="post-action-options">
              <span><PictureOutlined className="image-upload-icon" />Add an image</span>
              <button>Post</button>
            </p>
          </div>
        </div>
        
        <PostFeed />
        <PostFeed />
      </main>
      <aside className="news-section">News Section</aside>
    </div>
  );
}

export default Dashboard;