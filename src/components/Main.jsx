import React, { useState } from "react";
import PostFullView from "./Post/PostFullView";
import PostModal from "./Post/PostModal";

const Main = () => {
  const [showModal, setShowModal] = useState(false);
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);

  const handleClick = () => setShowModal(!showModal);

  const handleAddPost = (post) => {
    setPosts([post, ...posts]);
    setShowModal(false);
  };

  const handlePostClick = (post) => {
    if (post) {
      setSelectedPost(post);
    }
  };

  return (
    <div>
      <PostModal showModal={showModal} handleClick={handleClick} handleAddPost={handleAddPost} />
      {selectedPost && <PostFullView post={selectedPost} />}
    
        <div className="post-list">
          {posts.map((post, index) => (
            <div key={index} className="post-item" onClick={() => handlePostClick(post)}>
              <p>{post.description}</p>
              {post.image && <img src={post.image} alt="Post Thumbnail" />}
              {post.video && <video src={post.video} controls />}
              {/* Render comments or other post details */}
              {/* Adjust this part based on how you store and want to display comments */}
              {post.comments && post.comments.map((comment, idx) => (
                <div key={idx} className="post-comment">
                  <p>{comment.text}</p>
                </div>
              ))}
            </div>
          ))}
        <PostFullView/>
        <PostFullView/>
        </div>

    </div>
  );
};

export default Main;
