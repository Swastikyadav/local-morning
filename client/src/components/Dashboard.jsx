import ProfileSection from "./ProfileSection";
import PostSection from "./PostSection";
import NewsSection from "./NewsSection";

import "../style/dashboard.css";

function Dashboard({logOutUser}) {
  return (
    <div className="dashboard">
      <ProfileSection logOutUser={logOutUser} />

      <PostSection />

      <NewsSection />
    </div>
  );
}

export default Dashboard;