import axios from "axios";

const base_url = "http://localhost:5000/api";

const pagination = async (data, newData, func) => {
  let updatedData = [];
  if (newData.length !== 0) {
    const uniqueNewData = newData.filter(
      (newDataLoop) =>
        !data.some(
          (existingComment) =>
            existingComment._id === newDataLoop._id &&
            existingComment.content === newDataLoop.content
        )
    );
    if (uniqueNewData.length !== 0) {
      updatedData = [...data, ...uniqueNewData];
      func(updatedData);
    }
  }
  return updatedData;
};

export const getPostById = async (id, func) => {
  try {
    const response = await axios.get(`${base_url}/posts/${id}`);
    func(response.data); // Update state with the data
  } catch (error) {
    console.error("Error fetching post:", error); // Handle errors if any
  }
};

export const addLike = async (id, type) => {
  try {
    const res = await axios.post(`${base_url}/likes`, {
      typeId: id,
      type: type,
    });
  } catch (error) {
    console.error("Error fetching feed posts:", error); // Handle errors if any
  }
};
export const deleteLike = async (id, type) => {
  try {
    const res = await axios.delete(`${base_url}/likes`, {
      data: {
        typeId: id,
        type: type,
      },
    });
  } catch (error) {
    console.error("Error fetching feed posts:", error); // Handle errors if any
  }
};
export const getFeedPosts = async (func, pageParam, limit = 10, posts = []) => {
  try {
    const res = await axios.get(
      `${base_url}/posts?page=${pageParam}&limit=${limit}`
    );
    // Ensure `posts` is an array and append new data to it
    const newPosts = res.data;
    const updatedPosts = pagination(posts, newPosts, func);
    return updatedPosts;
  } catch (error) {
    console.error("Error fetching feed posts:", error); // Handle errors if any
  }
};

export const getUserPosts = async (func, pageParam, limit = 10, posts = []) => {
  try {
    const res = await axios.get(
      `${base_url}/users/posts?page=${pageParam}&limit=${limit}`
    );

    // Ensure `posts` is an array and append new data to it
    const updatedPosts = Array.isArray(posts)
      ? [...posts, ...res.data.posts]
      : res.data.posts;
    func(updatedPosts);
  } catch (error) {
    console.error("Error fetching feed posts:", error); // Handle errors if any
  }
};

export const getPostComments = async (
  func,
  pageParam = 1,
  limit = 10,
  comments = [],
  postId
) => {
  try {
    const res = await axios.get(
      `${base_url}/posts/comments/${postId}?page=${pageParam}&limit=${limit}`
    );

    const newComments = res.data.comments;
    let updatedComments = pagination(comments, newComments, func);

    return updatedComments;
  } catch (error) {
    console.error("Error fetching feed comments:", error); // Handle errors if any
  }
};

export const sharePost = async (userId, postId) => {
  try {
    const res = await axios.patch(`${base_url}/posts/share`, {
      userId: userId,
      postId: postId,
    });
    console.log(res);
  } catch (error) {
    console.error("Error fetching feed posts:", error); // Handle errors if any
  }
};
export const addComment = async (postId, comment) => {
  try {
    const res = await axios.post(`${base_url}/comments`, {
      postId: postId,
      comment: comment,
    });
    console.log(res);
  } catch (error) {
    console.error("Error on Adding comment:", error); // Handle errors if any
  }
};
export const editComment = async (comment, commentID) => {
  try {
    const res = await axios.patch(`${base_url}/comments/${commentID}`, {
      comment: comment,
    });
    console.log(res);
  } catch (error) {
    console.error("Error on editing comment:", error); // Handle errors if any
  }
};

export const deleteComment = async (commentId) => {
  try {
    const res = await axios.delete(`${base_url}/comments/${commentId}`);
  } catch (error) {
    console.error("Error on Adding comment:", error); // Handle errors if any
  }
};

export const deletePost = async (postId, func) => {
  try {
    
    const response = await axios.delete(`${base_url}/posts/${postId}`);
    func(
      (prevComments) => prevComments.filter((c) => c._id !== postId)
    );
  } catch (error) {
    console.error("Error fetching post:", error); // Handle errors if any
  }
};
