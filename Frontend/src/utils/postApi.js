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

export const getFeedPosts = async(func)=>{
  try {
    const res = await axios.get(`${base_url}/posts?page=1&limit=10`);
    console.log(res);
    
    func(res.data);
  } catch (error) {
    console.error("Error fetching feed posts:", error); // Handle errors if any
  }
}

