import ProfileSection from "./ProfileSection";
import PostSection from "./PostSection";
import NewsSection from "./NewsSection";

import "../style/dashboard.css";

function Dashboard() {
  return (
    <div className="dashboard">
      <ProfileSection />

      <PostSection />

      <NewsSection />
    </div>
  );
}

export default Dashboard;