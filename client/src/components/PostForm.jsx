import { PictureOutlined } from "@ant-design/icons";
import { Input } from "antd";
const { TextArea } = Input;

function PostForm() {
  return (
    <div className="post-form">
      <img src="https://pbs.twimg.com/profile_images/1411339822942220294/cB2H_0Rm_400x400.jpg" className="profile-pic" alt="profile-pic"/>
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