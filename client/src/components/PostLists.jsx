import { Link } from "react-router-dom";

import PostCard from "./PostCard";

import "../style/postLists.css";

function PostLists() {
  return (
    <div className="post-lists">
      <Link to="/">{`<<< Back To Home`}</Link>
      <h4>My Posts / Liked Posts</h4>

      <div className="post-cards">
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
      </div>
    </div>
  );
}

export default PostLists;