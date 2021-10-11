import { useContext } from "react";
import { PictureOutlined } from "@ant-design/icons";
import { Input } from "antd";

import UserContext from "../UserContext";

import "../style/postForm.css";

const { TextArea } = Input;

function PostForm() {
  const { user } = useContext(UserContext);

  return (
    <div className="post-form">
      <img src={user.avatar} className="profile-pic" alt="profile-pic"/>
      <div className="textarea-container">
        <TextArea placeholder="Share your thoughts..." autoSize />
        <p className="post-action-options">
          <span><PictureOutlined className="image-upload-icon" />Add an image</span>
          <button>Post</button>
        </p>
      </div>
    </div>
  );
}

export default PostForm;