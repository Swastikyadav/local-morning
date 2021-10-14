import { useContext } from "react";
import { LikeOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import UserContext from "../UserContext";
import API from "../utils/API";

import "../style/postCard.css";

function PostCard({ postId, content, image, likesArray, author, fetchPosts }) {
  const { user, updateUser } = useContext(UserContext);

  const notifyError = (message) => toast.error(message);
  const notifySuccess = (message) => toast.success(message);

  const handleDeletePost = (postId) => {
    API.deletePost(postId)
      .then(res => {
        const { updatedUser, message, success } = res;
        if(success) {
          notifySuccess(message);
          updateUser(updatedUser);
          fetchPosts(updatedUser.postsId);
        } else {
          notifyError("Cannot delete post");
        }
      })
  }

  return (
    <article className="post-card">
      <Link to="/dashboard/profile/789456">
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

      <button className="like-btn"><LikeOutlined /> {likesArray && likesArray.length}</button>
      {(user._id === author._id) && <button className="delete-btn" onClick={() => handleDeletePost(postId)}><DeleteOutlined /></button>}
    </article>
  );
}

export default PostCard;