import axios from "axios";

const base_url = "http://localhost:5000/api";
export const getPostById = async (id, func) => {
  try {
    const response = await axios.get(`${base_url}/posts/${id}`);
    func(response.data); // Update state with the data
    console.log(response.data); // Log the fetched data
  } catch (error) {
    console.error("Error fetching post:", error); // Handle errors if any
  }
};

export const getFeedPosts = async (func, pageParam, limit = 10, posts = []) => {
  try {
    const res = await axios.get(
      `${base_url}/posts?page=${pageParam}&limit=${limit}`
    );
    // Ensure `posts` is an array and append new data to it
    const updatedPosts = Array.isArray(posts)
      ? [...posts, ...res.data]
      : res.data;
    func(updatedPosts);
  } catch (error) {
    console.error("Error fetching feed posts:", error); // Handle errors if any
  }
};

export const getUserPosts = async (func, pageParam, limit = 10, posts = []) => {
  try {
    const res = await axios.get(
      `${base_url}/users/posts?page=${pageParam}&limit=${limit}`
    );
    console.log(res);

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
    // todo handel pagination call to make sure that each comment send only once
    const res = await axios.get(
      `${base_url}/posts/comments/${postId}?page=${pageParam}&limit=${limit}`
    );
    // Ensure `posts` is an array and append new data to it
    let updatedComments = res.data.comments;

    updatedComments =
      comments === updatedComments
        ? [...comments, ...res.data.comments]
        : res.data.comments;

    func(updatedComments);
    return updatedComments;
  } catch (error) {
    console.error("Error fetching feed comments:", error); // Handle errors if any
  }
};
