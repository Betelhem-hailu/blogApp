import axios from 'axios';
axios.defaults.withCredentials = true;
const API = "http://localhost:5000/post";

const createPost = async(formData) => {
    // for (const [key, value] of formData.entries()) {
    //   console.log(`${key}: ${value}`);
    // }
    return axios.post(API + "/createPost", formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    }, { credentials: "include" }).then(response => {
      return response.data;
    }).catch(error => {
      if (error.response && error.response.status === 409) {
        // Handle conflict
        throw new Error(error);
      } else {
        // Handle other errors
        throw new Error(error || 'An unexpected error occurred'); 
      }
    });
  };
  
  //get tags
  const getTags = async() => {
    return axios.get(API + "/getTag").then(response => {
      return response.data;
    }).catch(error => {
      if (error.response && error.response.status === 409) {
        // Handle conflict
        throw new Error(error);
      } else {
        // Handle other errors
        throw new Error(error || 'An unexpected error occurred'); 
      }
    });
  }

  //getPostsbyuserId
  const getPostsbyUser = async() => {
    return axios.get(API + "/getPostsbyuserId").then(response => {
      return response.data;
    }
    ).catch(error => {
      if (error.response && error.response.status === 409) {
        // Handle conflict
        throw new Error(error);
        } else
        // Handle other errors
        throw new Error(error || 'An unexpected error occurred');
        }
        );
        }

  //getposts
  //get postsbyId
  const getPostById = async(id) => {
    return axios.get(API + "/getPost/" + id).then(response => {
      return response.data;
    }).catch(error => {
      if (error.response && error.response.status === 409) {
        // Handle conflict
        throw new Error(error);
        } else
        // Handle other errors
        throw new Error(error || 'An unexpected error occurred');
        });
  }

  //update post
  const updatePost = async({postId, formData}) => {
    return axios.put(API + `/updatePost/${postId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        }
        }).then(response => {
          return response.data;
          }).catch(error => {
            if (error.response && error.response.status === 409) {
              // Handle conflict
              throw new Error(error);
              } else
              // Handle other errors
              throw new Error(error || 'An unexpected error occurred');
              });
  }

    export const postService = {
    createPost,
    getTags,
    getPostById,
    getPostsbyUser,
    updatePost
  };
