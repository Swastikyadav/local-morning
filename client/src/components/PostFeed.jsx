import "../style/postFeed.css";

function PostFeed() {
  return (
    <article className="post-card">
      <div className="post-details-container">
        <img src="https://pbs.twimg.com/profile_images/1411339822942220294/cB2H_0Rm_400x400.jpg" className="profile-pic" alt="profile-pic"/>
        <div className="post-detail-text">
          <h2>Swastik Yadav</h2>
          <small>4 Hours ago</small>
        </div>
      </div>

      <p className="post-content">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum doloribus iure, delectus expedita rerum commodi ullam voluptatum qui possimus officia atque iste laudantium ipsum at ut tempore magnam aspernatur nostrum.

        <br/><br/>

        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlrZqTCInyg6RfYC7Ape20o-EWP1EN_A8fOA&usqp=CAU" alt="doggy" width="100%" height="250"/>
      </p>
    </article>
  );
}

export default PostFeed;