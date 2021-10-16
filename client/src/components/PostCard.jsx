import { useContext, useState, useEffect } from "react";
import { LikeOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import UserContext from "../UserContext";
import API from "../utils/API";

import "../style/postCard.css";

function PostCard({ postId, postType, content, image, likesArray, author, fetchPosts }) {
  const { user, updateUser } = useContext(UserContext);
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    setLikes(likesArray && likesArray.length);

    return () => setLikes(0);
  }, [likesArray]);

  const notifyError = (message) => toast.error(message);
  const notifySuccess = (message) => toast.success(message);

  const handleDeletePost = (postId) => {
    API.deletePost(postId)
      .then(res => {
        const { updatedUser, message, success } = res;
        if(success) {
          notifySuccess(message);
          updateUser(updatedUser);
          fetchPosts(postType && postType === "myPosts" ? updatedUser.postsId : updatedUser.likedPosts);
        } else {
          notifyError("Cannot delete post");
        }
      })
  }

  const handleLikePost = (postId) => {
    API.patchLikePost(postId)
      .then(res => {
        const { updatedUser, updatedPost, success } = res;

        if(success) {
          updateUser(updatedUser);
          setLikes(updatedPost.likes.length);
        } else {
          notifyError("Cannot like post");
        }
      })
  }

  return (
    <article className="post-card">
      <Link to={`/dashboard/profile/${author._id}`}>
        <div className="post-details-container">
          <img src={author.avatar} className="profile-pic" alt="profile-pic"/>
          <div className="post-detail-text">
            <h2>{author.name}</h2>
            <small>4 Hours ago</small>
          </div>
        </div>
      </Link>

      <p className="post-content">
        {content}

        <br/><br/>

        {image && <img src={image} alt="doggy" width="100%" height="250"/>}
      </p>

      <button className="like-btn" onClick={() => handleLikePost(postId)}><LikeOutlined /> {likes}</button>
      {(user._id === author._id) && <button className="delete-btn" onClick={() => handleDeletePost(postId)}><DeleteOutlined /></button>}
    </article>
  );
}

export default PostCard;