import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import ProfileSection from "./ProfileSection";
import PostCard from "./PostCard";
import API from "../utils/API";

import "../style/userProfile.css";

const style = {
  width: "100%",
  position: "relative",
  margin: "0 auto"
}

function UserProfile() {
  const { id } = useParams();
  const [userData, setUserData] = useState({});

  const notifyError = (message) => toast.error(message);

  useEffect(() => {
    API.getUserProfile(id)
      .then(res => {
        const { user, success } = res;
        
        if(success) {
          setUserData(user);
        } else {
          notifyError("No user found");
        }
      })
  }, [id]);

  return (
    <div className="user-profile">
      <ProfileSection style={style} userProfileData={userData} />

      <aside>
        <h4>User Posts</h4>

        {
          userData.postsId && userData.postsId.map(post => {
            return <PostCard key={post._id} postId={post._id} content={post.content} image={post.image} likesArray={post.likes} author={userData} />
          })
        }
      </aside>
    </div>
  );
}

export default UserProfile;