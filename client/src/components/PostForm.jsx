import { useContext, useState } from "react";
import { PictureOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { toast } from "react-toastify";

import UserContext from "../UserContext";
import API from "../utils/API";

import "../style/postForm.css";

const { TextArea } = Input;

function PostForm() {
  const { user } = useContext(UserContext);
  const [post, setPost] = useState({
    content: "",
    image: null
  });
  const [loading, setLoading] = useState(false);

  const notifyError = (message) => toast.error(message);
  const notifySuccess = (message) => toast.success(message);

  const handleFileChange = (event) => {
    setPost({
      ...post,
      image: event.target.files[0]
    });
  }

  const handleChange = (event) => {
    setPost({
      ...post,
      content: event.target.value
    });
  }

  const handleSubmit = () => {
    setLoading(true);

    const formData = new FormData();
    formData.append("content", post.content);
    formData.append("image", post.image);

    API.postCreatePost(formData)
      .then(res => {
        const { newPost, success, message } = res;
        
        if(success) {
          setLoading(false);
          notifySuccess("Post created successfully");
          // refresh post section with newly created post.
        } else {
          setLoading(false);
          notifyError(message);
        }
      })
  }

  return (
    <div className="post-form">
      <img src={user.avatar} className="profile-pic" alt="profile-pic"/>
      <div className="textarea-container">
        <TextArea placeholder="Share your thoughts..." onChange={handleChange} value={post.content} autoSize />
        <p className="post-action-options">
          <label htmlFor="file"><span><PictureOutlined className="image-upload-icon" /></span></label>
          <input type="file" id="file" onChange={handleFileChange} hidden />
          <button onClick={handleSubmit}>{loading ? "Posting..." : "Post"}</button>
        </p>
      </div>
    </div>
  );
}

export default PostForm;