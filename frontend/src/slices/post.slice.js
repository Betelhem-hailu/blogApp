import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postService } from "../services/post.service";
import { commentService } from "../services/comment.service";

//createPost
export const createPost = createAsyncThunk(
  "post/createPost",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await postService.createPost(formData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

//getTags
export const getTags = createAsyncThunk(
  "post/getTags",
  async (_, { rejectWithValue }) => {
    try {
      const response = await postService.getTags();
      return response;
      } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message
      );
    }
  }
);

//getPosts
export const getPosts = createAsyncThunk(
  "post/getPosts",
  async ({search, tag}, { rejectWithValue }) => {
    try {
      const response = await postService.getPosts({search, tag});
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

//getPopularPosts
export const getPopularPosts = createAsyncThunk(
  "post/getPopularPosts",
  async ( {search, tag}, { rejectWithValue }) => {
    try {
      const response = await postService.getPopularPosts({search, tag});
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

//getPostsbyuserId
export const getPostsbyuserId = createAsyncThunk(
  "post/getPostsbyuserId",
  async (_, { rejectWithValue }) => {
    try {
      const response = await postService.getPostsbyUser();
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

//getPostsbyId
export const getPostsbyId = createAsyncThunk(
  "post/getPostsbyId",
  async (id, { rejectWithValue }) => {
    try {
      const response = await postService.getPostById(id);
      return response;
      } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message
          );
        }
      }
    );

  //toggleLike
  export const toggleLike = createAsyncThunk(
    "post/toggleLike",
    async (postId, { rejectWithValue }) => {
      try {
        const response = await postService.toggleLike(postId);
        return response;
        } catch (error) {
          return rejectWithValue(error.response?.data?.message || error.message
          );
          }
          }
    );

  //updatePost
  export const updatePost = createAsyncThunk(
    "post/updatePost",
    async ({postId, formData}, { rejectWithValue }) => {
      try {
        const response = await postService.updatePost({postId, formData});
        return response
        } catch (error) {
          return rejectWithValue(error.response?.data?.message || error.message
          );
        }
      }
    );

    //deletePost
    export const deletePost = createAsyncThunk(
      "post/deletePost",
      async (id, { rejectWithValue }) => {
        try {
          const response = await postService.deletePost(id);
          return response
          } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message
              );
              }
              }
    )
    export const createComment = createAsyncThunk(
      'post/createComment',
      async (commentData, thunkAPI) => {
          try {
              const response = await commentService.createComment(commentData);
              return response;
          } catch (error) {
              console.log(error.response);
              return thunkAPI.rejectWithValue(error.response?.data || error);
          }
      }
  );

const initialState = {
  comments: [],
  like: false,
  likeCount: 0,
  data: null,
  post: null,
  tags: null,
  loading: false,
  error: null,
  msg: null,
};

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
      resetPost: (state) => {
        state.data = [];
      },
      setNewComment: (state, action) => {
        state.comments.push(action.payload);
      },
      setLike: (state) => {
        state.like = true;
        state.likeCount = state.likeCount + 1;
      },
      unSetLike: (state) => {
        state.like = false;
        state.likeCount = state.likeCount - 1;
      }
    },
    extraReducers: (builder) => {
      builder
        .addCase(createPost.pending, (state) => {
          state.loading = true;
          state.error = null; 
        })
        .addCase(createPost.fulfilled, (state, action) => {
          state.loading = false;
          state.msg = action.payload; 
        })
        .addCase(createPost.rejected, (state, payload) => {
          state.loading = false;
          state.error = payload;
        })
        .addCase(getTags.pending, (state) => {
          state.loading = true;
          state.error = null; 
        })
        .addCase(getTags.fulfilled, (state, action) => {
          state.loading = false;
          state.tags = action.payload; 
        })
        .addCase(getTags.rejected, (state, payload) => {
          state.loading = false;
          state.error = payload;
        })
        .addCase(getPosts.pending, (state) => {
          state.loading = true;
          state.error = null; 
        })
        .addCase(getPosts.fulfilled, (state, action) => {
          state.loading = false;
          state.data = action.payload; 
        })
        .addCase(getPosts.rejected, (state, payload) => {
          state.loading = false;
          state.error = payload;
        })
        .addCase(getPopularPosts.pending, (state) => {
          state.loading = true;
          state.error = null; 
        })
        .addCase(getPopularPosts.fulfilled, (state, action) => {
          state.loading = false;
          state.data = action.payload; 
        })
        .addCase(getPopularPosts.rejected, (state, payload) => {
          state.loading = false;
          state.error = payload;
        })
        .addCase(getPostsbyuserId.pending, (state) => {
          state.loading = true;
          state.error = null; 
        })
        .addCase(getPostsbyuserId.fulfilled, (state, action) => {
          state.loading = false;
          state.data = action.payload; 
        })
        .addCase(getPostsbyuserId.rejected, (state, payload) => {
          state.loading = false;
          state.error = payload;
        })
        .addCase(getPostsbyId.pending, (state) => {
          state.loading = true;
          state.error = null; 
        })
        .addCase(getPostsbyId.fulfilled, (state, action) => {
          state.loading = false;
          state.post = action.payload; 
          state.comments = action.payload.comments;
          state.like = action.payload.userLike;
          state.likeCount = action.payload.likeCount;
        })
        .addCase(getPostsbyId.rejected, (state, payload) => {
          state.loading = false;
          state.error = payload;
        })
        .addCase(updatePost.pending, (state) => {
          state.loading = true;
          state.error = null; 
        })
        .addCase(updatePost.fulfilled, (state, action) => {
          state.loading = false;
          state.msg = action.payload; 
        })
        .addCase(updatePost.rejected, (state, payload) => {
          state.loading = false;
          state.error = payload;
        })
        .addCase(deletePost.pending, (state) => {
          state.loading = true;
          state.error = null; 
        })
        .addCase(deletePost.fulfilled, (state, action) => {
          state.loading = false;
          console.log(action.payload);
          state.data = state.data.filter(post => post._id !== action.payload)
        })
        .addCase(deletePost.rejected, (state, payload) => {
          state.loading = false;
          state.error = payload;
        })
        .addCase(createComment.pending, (state) => {
          state.loading = true;
          state.error = null; 
        })
        .addCase(createComment.fulfilled, (state, action) => {
          state.loading = false;
          state.msg = action.payload; 
        })
        .addCase(createComment.rejected, (state, action) => {
          state.loading = false;
          state.error = action;
        })
        .addCase(toggleLike.pending, (state) => {
          state.loading = true;
          state.error = null; 
        })
        .addCase(toggleLike.fulfilled, (state, action) => {
          state.loading = false;
          state.msg = action.payload; 
        })
        .addCase(toggleLike.rejected, (state, action) => {
          state.loading = false;
          state.error = action;
        });
    },
  });
  
  export const { resetPost, setNewComment, setLike, unSetLike } = postSlice.actions;
  export default postSlice.reducer;