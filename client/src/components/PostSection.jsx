import PostCard from "./PostCard";
import PostForm from "./PostForm";

function PostSection() {
  return (
    <main className="post-section">
      <PostForm />
      
      <PostCard />
      <PostCard />
    </main>
  );
}

export default PostSection;