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
    console.log(res);

    // Ensure `posts` is an array and append new data to it
    const updatedPosts = Array.isArray(posts) ? [...posts, ...res.data] : res.data;
    func(updatedPosts);
  } catch (error) {
    console.error("Error fetching feed posts:", error); // Handle errors if any
  }
};


