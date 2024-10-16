import React, { useEffect, useState } from "react";
import PostFullView from "./Post/PostFullView";
import PostModal from "./Post/PostModal";
import { getFeedPosts } from "../utils/postApi";
// import CircularProgress from "@mui/material/CircularProgress";

const Main = () => {
  const [showModal, setShowModal] = useState(false);
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [change,setchange] = useState("none")
  useEffect(() => {
    getFeedPosts(setPosts);
  }, [change]);

  const handleClick = () => setShowModal(!showModal);

  const handleAddPost = (post) => {
    // setPosts([post, ...posts]);
    setShowModal(false);
  };

  const handlePostClick = (post) => {
    if (post) {
      setSelectedPost(post);
    }
  };

  return (
    <div className="w-[100%] xl:w-[50%] text-left">
      <PostModal
        showModal={showModal}
        handleClick={handleClick}
        handleAddPost={handleAddPost}
      />
      {selectedPost && <PostFullView post={selectedPost} />}

      <div className="post-list ">
        {posts.map((post, index) => (
          <div
            key={index}
            className="post-item"
            onClick={() => handlePostClick(post)}
          >
            <p>{post.description}</p>
            {post.image && <img src={post.image} alt="Post Thumbnail" />}
            {post.video && <video src={post.video} controls />}
            {/* Render comments or other post details */}
            {/* Adjust this part based on how you store and want to display comments */}
            {post.comments &&
              post.comments.map((comment, idx) => (
                <div key={idx} className="post-comment">
                  <p>{comment.text}</p>
                </div>
              ))}
          </div>
        ))}
        {posts ? (
          posts.length > 0 ? (
            posts.map((post) => (
              <PostFullView post={post} key={post._id} setChange={setchange} />
            ))
          ) : (
            <></>
            // <CircularProgress />
          )
        ) : (
          <></>
          // <CircularProgress />
        )}
      </div>
    </div>
  );
};

export default Main;
