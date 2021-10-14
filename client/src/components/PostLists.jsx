import { useContext, useState } from "react";
import { Link } from "react-router-dom";

import PostCard from "./PostCard";
import UserContext from "../UserContext";

import "../style/postLists.css";

function PostLists() {
  const { user } = useContext(UserContext);
  const [postsArray, setPostsArray] = useState(user.postsId);

  const fetchPostsArray = (userPostsArray) => {
    setPostsArray(userPostsArray);
  }

  return (
    <div className="post-lists">
      <Link to="/">{`<<< Back To Home`}</Link>
      <h4>My Posts / Liked Posts</h4>
      <div className="post-cards">
      {
        postsArray.length ? postsArray.reverse().map(post => {
          return <PostCard key={post._id} postId={post._id} content={post.content} image={post.image} likesArray={post.likes} author={user} fetchPosts={fetchPostsArray} />
        }) : <p>Nothing to show here...</p>
      }
      </div>
    </div>
  );
}

export default PostLists;