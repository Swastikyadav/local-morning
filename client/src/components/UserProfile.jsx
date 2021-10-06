import ProfileSection from "./ProfileSection";
import PostCard from "./PostCard";

import "../style/userProfile.css";

const style = {
  width: "100%",
  position: "relative",
  margin: "0 auto"
}

function UserProfile() {
  return (
    <div className="user-profile">
      <ProfileSection style={style} />

      <aside>
        <h4>User Posts</h4>

        <PostCard />
        <PostCard />
        <PostCard />
      </aside>
    </div>
  );
}

export default UserProfile;