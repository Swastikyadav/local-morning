import ProfileSection from "./ProfileSection";
import PostCard from "./PostCard";
import PostForm from "./PostForm";

import "../style/dashboard.css";

function Dashboard() {
  return (
    <div className="dashboard">
      <ProfileSection />
      <main className="post-section">
        <PostForm />
        
        <PostCard />
        <PostCard />
      </main>
      <aside className="news-section">News Section</aside>
    </div>
  );
}

export default Dashboard;