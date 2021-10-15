import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";

import PostCard from "./PostCard";
import UserContext from "../UserContext";

import "../style/postLists.css";

function PostLists({ postType }) {
  const { user } = useContext(UserContext);
  const [postsArray, setPostsArray] = useState([]);

  useEffect(() => {
    fetchPostsArray(postType === "myPosts" ? user.postsId : user.likedPosts);
  }, [postType, user]);

  const fetchPostsArray = (userPostsArray) => {
    setPostsArray(userPostsArray);
  }

  return (
    <div className="post-lists">
      <Link to="/">{`<<< Back To Home`}</Link>
      <h4>{postType}</h4>
      <div className="post-cards">
      {
        postsArray.length ? postsArray.map(post => {
          return <PostCard key={post._id} postId={post._id} postType={postType} content={post.content} image={post.image} likesArray={post.likes} author={post.authorId} fetchPosts={fetchPostsArray} />
        }) : <p>Nothing to show here...</p>
      }
      </div>
    </div>
  );
}

export default PostLists;