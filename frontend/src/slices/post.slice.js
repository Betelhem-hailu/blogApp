import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postService } from "../services/post.service";

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

const initialState = {
  data: null,
  post: null,
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
          state.data = action.payload; 
        })
        .addCase(getTags.rejected, (state, payload) => {
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
        });
    },
  });
  
  export const { resetPost } = postSlice.actions;
  export default postSlice.reducer;