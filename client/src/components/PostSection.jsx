import { useEffect, useState } from "react";

import API from "../utils/API";
import PostCard from "./PostCard";
import PostForm from "./PostForm";

function PostSection() {
  const [postsArray, setPostsArray] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = () => {
    API.getPosts()
      .then(res => {
        const { posts, success } = res;

        if(success) {
          setPostsArray(posts);
        }
      })
  }

  return (
    <main className="post-section">
      <PostForm fetchPosts={fetchPosts} />
      
      {
        postsArray.length ? postsArray.reverse().map(post => {
          return <PostCard key={post._id} postId={post._id} content={post.content} image={post.image} likesArray={post.likes} author={post.authorId} fetchPosts={fetchPosts} />
        }) : <p>Nothing to show here...</p>
      }
    </main>
  );
}

export default PostSection;