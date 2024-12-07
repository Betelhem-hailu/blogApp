import axios from "axios";
axios.defaults.withCredentials = true;
const API = "http://localhost:5000/post";

const createPost = async (formData) => {
  // for (const [key, value] of formData.entries()) {
  //   console.log(`${key}: ${value}`);
  // }
  return axios
    .post(
      API + "/createPost",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
      { credentials: "include" }
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      if (error.response && error.response.status === 409) {
        // Handle conflict
        throw new Error(error);
      } else if (error.response && error.response.status === 400) {
        throw new Error(error.response.data.errors);
      } else {
        // Handle other errors
        throw new Error(error || "An unexpected error occurred");
      }
    });
};

//get tags
const getTags = async () => {
  return axios
    .get(API + "/getTag")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      if (error.response && error.response.status === 409) {
        // Handle conflict
        throw new Error(error);
      } else {
        // Handle other errors
        throw new Error(error || "An unexpected error occurred");
      }
    });
};

//getPostsbyuserId
const getPostsbyUser = async () => {
  return axios
    .get(API + "/getPostsbyuserId")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      if (error.response && error.response.status === 409) {
        // Handle conflict
        throw new Error(error);
      }
      // Handle other errors
      else throw new Error(error || "An unexpected error occurred");
    });
};

//getposts
const getPosts = async ({ search = "", tag = "" }) => {
  return axios
    .get(API + "/getPost", {
      params: {
        search: search || "",
        tag: tag || "",  
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      if (error.response && error.response.status === 409) {
        // Handle conflict
        throw new Error(error);
      } else {
        // Handle other errors
        throw new Error(error || "An unexpected error occurred");
      }
    });
};

//getpopularposts
const getPopularPosts = async ({ search = "", tag = "" }) => {
  return axios
    .get(API + "/getPopularPost", {
      params: {
        search: search || "",
        tag: tag || "",  
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      if (error.response && error.response.status === 409) {
        // Handle conflict
        throw new Error(error);
      }
      // Handle other errors
      else throw new Error(error || "An unexpected error occurred");
    });
};

//get postsbyId
const getPostById = async (id) => {
  return axios
    .get(API + "/getPost/" + id)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      if (error.response && error.response.status === 409) {
        // Handle conflict
        throw new Error(error);
      }
      // Handle other errors
      else throw new Error(error || "An unexpected error occurred");
    });
};

//toggle like
const toggleLike = async (id) => {
  return axios
    .post(API + `/${id}/like`, {
      id: id,
    })
    .then((response) => {
      return response.data;
    });
};

//update post
const updatePost = async ({ postId, formData }) => {
  return axios
    .put(API + `/updatePost/${postId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      if (error.response && error.response.status === 409) {
        // Handle conflict
        throw new Error(error);
      }
      // Handle other errors
      else throw new Error(error || "An unexpected error occurred");
    });
};

//delete post
const deletePost = async (postId) => {
  return axios
    .delete(API + `/deletePost/${postId}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      if (error.response && error.response.status === 409) {
        // Handle conflict
        throw new Error(error);
      }
      // Handle other errors
      else throw new Error(error || "An unexpected error occurred");
    });
};

export const postService = {
  createPost,
  getTags,
  getPosts,
  getPopularPosts,
  getPostById,
  getPostsbyUser,
  toggleLike,
  updatePost,
  deletePost,
};
