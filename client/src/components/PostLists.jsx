import PostCard from "./PostCard";

import "../style/postLists.css";

function PostLists() {
  return (
    <div className="post-lists">
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