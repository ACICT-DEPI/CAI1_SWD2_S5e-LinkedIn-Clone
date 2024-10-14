import React, { useState } from "react";
import ReactPlayer from "react-player";
import styled from "styled-components";
import "../Post/style.css";

const PostModal = ({ showModal, handleClick, handleAddPost, }) => {
  const [editorText, setEditorText] = useState("");
  const [assetArea, setAssetArea] = useState("");
  const [shareImage, setShareImage] = useState("");
  const [videoLink, setVideoLink] = useState("");

  const handleChange = (e) => {
    const image = e.target.files[0];
    if (!image) {
      alert(`not an image , the file is a ${typeof image}`);
      return;
    }
    setShareImage(image);
  };

  const handlePostArticles = (e) => {
    e.preventDefault();
    const newPost = {
      image: shareImage ? URL.createObjectURL(shareImage) : null,
      video: videoLink,
      content: editorText,
    };
    handleAddPost(newPost);
    reset(e);
  };

  const switchAssetArea = (area) => {
    setShareImage("");
    setVideoLink("");
    setAssetArea(area);
  };

  const reset = (e) => {
    setEditorText("");
    setShareImage("");
    setVideoLink("");
    setAssetArea("");
    handleClick(e);
  };

  return (
    <>
      <div className="middle-main-1" style={{ display: "flex", flexDirection: "column"}}>
        <div className="post-1">
          <img
            className="middle-pic"
            src="src/assets/images/photo.svg"
            alt="Profile"
          />
          <input
            className="post"
            type="text"
            placeholder="Start a post"
            onClick={(e) => reset(e)}
            style={{height: "40px", width: "100%", fontSize: "16px",marginBlock: "10px"}}
          />
        </div>
        <div className="linked-input" onClick={(e) => reset(e)}>
          <div className="input">
            <img
              className="upload"
              src="/src/assets/images/share-image.svg "
              alt="Upload"
            />
            <p>Photo</p>
          </div>
          <div className="input" onClick={(e) => reset(e)}>
            <img
              className="upload"
              src="/src/assets/images/ExperienceIcon.svg"
              alt="Upload"
            />
            <p>Jop</p>
          </div>
          <div className="input" onClick={(e) => reset(e)}>
            <img
              className="upload"
              src="/src/assets/images/share-video.svg"
              alt="Video"
            />
            <p>Video</p>
          </div>
        </div>
      </div>
      {showModal && (
        <Container>
          <Content>
            <Header>
              <h2>Create a post</h2>
              <button onClick={(e) => reset(e)}>
                <img src="/src/assets/images/close-icon.svg" alt="Close" />
              </button>
            </Header>
            <ShareContent>
              <UserInfo>
                <img src="src/assets/images/photo.svg" alt="User" />
                <span>Username</span>
              </UserInfo>
              <Editor>
                <textarea
                  value={editorText}
                  onChange={(e) => setEditorText(e.target.value)}
                  placeholder="What do you want to talk about?"
                  autoFocus={true}
                />
                {assetArea === "image" ? (
                  <UploadImage>
                    <input
                      type="file"
                      name="image"
                      id="file"
                      style={{ display: "none" }}
                      onChange={handleChange}
                    />
                    <p>
                      <label
                        style={{
                          cursor: "pointer",
                          display: "block",
                          marginBottom: "15px",
                        }}
                        htmlFor="file"
                      >
                        Select an image to share
                      </label>
                    </p>
                    {shareImage && (
                      <img src={URL.createObjectURL(shareImage)} alt="img" />
                    )}
                  </UploadImage>
                ) : assetArea === "media" ? (
                  <>
                    <input
                      style={{ width: "100%", height: "30px",background: "#fff" }}
                      type="text"
                      value={videoLink}
                      onChange={(e) => setVideoLink(e.target.value)}
                      placeholder="Please input a video link"
                    />
                    {videoLink && <ReactPlayer width="100%" url={videoLink} />}
                  </>
                ) : null}

              </Editor>
            </ShareContent>
            <ShareCreation>
              <AttachAssets>
                <AssetButton onClick={() => switchAssetArea("image")}>
                  <img
                    src="/src/assets/images/share-image.svg "
                    alt="Share Image"
                  />
                </AssetButton>
                <AssetButton onClick={() => switchAssetArea("media")}>
                  <img
                    src="/src/assets/images/share-video.svg"
                    alt="Share Video"
                  />
                </AssetButton>
              </AttachAssets>
              <ShareComment>
                <AssetButton>
                  <img src="/src/assets/images/article-icon.svg" alt="Share Comment" />
                  Anyone
                </AssetButton>
              </ShareComment>
              <PostButton
                onClick={(e) => handlePostArticles(e)}
                disabled={!editorText}
              >
                Post
              </PostButton>
            </ShareCreation>
          </Content>
        </Container>
      )}
    </>
  );
};

// Styled Components
const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  color: black;
  background-color: rgba(0, 0, 0, 0.8);
  animation: fadeIn 0.3s;
`;

const Content = styled.div`
  width: 100%;
  max-width: 552px;
  background-color: white;
  height: 60%;
  overflow: scroll;
  border-radius: 5px;
  position: relative;
  display: flex;
  flex-direction: column;
  top: 32px;
  margin: 0 auto;

  button {
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: background 0.3s ease;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  align-items: center;

  h2 {
    line-height: 1.5;
    font-weight: 400;
    font-size: 18px;
    color: rgba(0, 0, 0, 0.6);
  }

  button {
    height: 40px;
    width: 40px;
    min-width: auto;
    color: rgba(0, 0, 0, 0.15);
    background: none;
    border-radius: 50%;
    cursor: pointer;
    text-align: center;
    &:hover {
    background-color: rgba(0, 0, 0, 0.08);
    border-radius: 50%;
  }
    img {
      width: 16px;
      height: 16px;
    }
  }
`;

const ShareContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: auto;
  padding: 8px 12px;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 24px;

  img {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    border: 2px solid transparent;
  }

  span {
    font-weight: 600;
    font-size: 16px;
    margin-left: 5px;
  }
`;

const Editor = styled.div`
  padding: 12px 24px;

  textarea {
    width: 100%;
    min-height: 100px;
    resize: none;
    font-size: 16px;
    font-weight: 400;
    border: none;
    outline: none;
    line-height: 1.5;
    color: #000 !important;
    background-color: #fff !important;
  }
`;

const UploadImage = styled.div`
  text-align: center;

  img {
    width: 100%;
  }
`;

const ShareCreation = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 24px;
  height: 30px;
`;

const AttachAssets = styled.div`
  display: flex;
  align-items: center;
`;

const AssetButton = styled.button`
  height: 40px;
  width: 40px !important;
  min-width: auto;
  color: rgba(0, 0, 0, 0.6);
  font-size: 14px;
  margin-right: 8px;
  border: none;
  display: flex;
  align-items: center;
  transition: background 0.3s ease;

  &:hover {
    background-color: rgba(0, 0, 0, 0.08);
    border-radius: 50%;
  }

  img {
    width: 20px;
    height: 20px;
    margin-right: 4px;
  }
`;

const ShareComment = styled.div`
  display: flex;
  align-items: center;
`;

const PostButton = styled.button`
  background: #0a66c2;
  border: none;
  color: white;
  padding: 12px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  transform: translateY(-10px);
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background-color: #004182;
  }

  &:disabled {
    background-color: rgba(0, 0, 0, 0.4);
    cursor: not-allowed;
  }
`;

export default PostModal;
