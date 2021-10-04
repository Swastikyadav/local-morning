import ProfileSection from "./ProfileSection";

import "../style/dashboard.css";

function Dashboard() {
  return (
    <div className="dashboard">
      <ProfileSection />
      <main className="post-section">Post Section</main>
      <aside className="news-section">News Section</aside>
    </div>
  );
}

export default Dashboard;