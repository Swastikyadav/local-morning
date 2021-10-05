import ProfileSection from "./ProfileSection";
import PostCard from "./PostCard";
import PostForm from "./PostForm";
import NewsCard from "./NewsCard";

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

      <aside className="news-section">
        <h2 className="heading">Local Morning News</h2>

        <form > 
          <input className="search-input" type="search" placeholder="Search News Here..." />
          <input className="search-btn" type="submit" value="Search" />
        </form>

        <NewsCard />
        <NewsCard />
        <NewsCard />
        <NewsCard />
        <NewsCard />
        <NewsCard />
        <NewsCard />
        <NewsCard />
        <NewsCard />
        <NewsCard />
      </aside>
    </div>
  );
}

export default Dashboard;