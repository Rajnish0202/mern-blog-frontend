import axios from 'axios';
import { toast } from 'react-toastify';
import {
  ALL_BLOG_FAIL,
  ALL_BLOG_REQUEST,
  ALL_BLOG_SUCCESS,
  ALL_COMMENT_FAIL,
  ALL_COMMENT_REQUEST,
  ALL_COMMENT_SUCCESS,
  BLOG_DETAILS_FAIL,
  BLOG_DETAILS_REQUEST,
  BLOG_DETAILS_SUCCESS,
  CLEAR_ERRORS,
  DELETE_BLOG_FAIL,
  DELETE_BLOG_REQUEST,
  DELETE_BLOG_SUCCESS,
  DELETE_COMMENT_FAIL,
  DELETE_COMMENT_REQUEST,
  DELETE_COMMENT_SUCCESS,
  MY_BLOG_FAIL,
  MY_BLOG_REQUEST,
  MY_BLOG_SUCCESS,
  NEW_BLOG_FAIL,
  NEW_BLOG_REQUEST,
  NEW_BLOG_SUCCESS,
  NEW_COMMENT_FAIL,
  NEW_COMMENT_REQUEST,
  NEW_COMMENT_SUCCESS,
  UPDATE_BLOG_FAIL,
  UPDATE_BLOG_REQUEST,
  UPDATE_BLOG_SUCCESS,
} from '../constants/blogConstant';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

// Getting all Blogs
export const getAllBlogs =
  (page, sort, search, filterCategory) => async (dispatch) => {
    try {
      dispatch({ type: ALL_BLOG_REQUEST });

      const { data } = await axios.get(
        `${BACKEND_URL}/api/blogs/allblogs?page=${page}&sort=${sort?.sort},${
          sort.order
        }&category=${filterCategory?.toString()}&search=${search}`
      );

      dispatch({ type: ALL_BLOG_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: ALL_BLOG_FAIL,
        payload:
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString(),
      });
    }
  };

// Getting Blogs Details
export const getBlogDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: BLOG_DETAILS_REQUEST });

    const { data } = await axios.get(`${BACKEND_URL}/api/blogs/${id}`);

    dispatch({ type: BLOG_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: BLOG_DETAILS_FAIL,
      payload:
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString(),
    });
  }
};

// Getting all Blogs
export const myBlogs =
  (page, sort, search, filterCategory) => async (dispatch) => {
    try {
      dispatch({ type: MY_BLOG_REQUEST });

      const { data } = await axios.get(
        `${BACKEND_URL}/api/blogs?page=${page}&sort=${sort?.sort},${
          sort.order
        }&category=${filterCategory?.toString()}&search=${search}`
      );

      dispatch({ type: MY_BLOG_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: MY_BLOG_FAIL,
        payload:
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString(),
      });
    }
  };

// Adding new blog
export const newBlogs = (blogData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_BLOG_REQUEST });

    const config = {
      headers: { 'Content-Type': 'multiform/form-data' },
    };
    const { data } = await axios.post(
      `${BACKEND_URL}/api/blogs/postblog`,
      blogData,
      config
    );

    dispatch({ type: NEW_BLOG_SUCCESS, payload: data });
    toast.success('Blog Added Successfully.');
  } catch (error) {
    dispatch({
      type: NEW_BLOG_FAIL,
      payload:
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString(),
    });
  }
};

// Udated Blog
export const updateBlogs = (blogData, id) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_BLOG_REQUEST });

    const config = {
      headers: { 'Content-Type': 'multiform/form-data' },
    };
    const { data } = await axios.put(
      `${BACKEND_URL}/api/blogs/myblog/${id}`,
      blogData,
      config
    );

    dispatch({ type: UPDATE_BLOG_SUCCESS, payload: data });
    toast.success('Blog UpdatedSuccessfully.');
  } catch (error) {
    dispatch({
      type: UPDATE_BLOG_FAIL,
      payload:
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString(),
    });
  }
};

export const deleteBlogs = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_BLOG_REQUEST });

    const config = {
      headers: { 'Content-Type': 'application/json' },
    };
    const { data } = await axios.delete(
      `${BACKEND_URL}/api/blogs/myblog/${id}`,
      config
    );

    dispatch({ type: DELETE_BLOG_SUCCESS, payload: data });
    toast.success(data.message);
  } catch (error) {
    dispatch({
      type: DELETE_BLOG_FAIL,
      payload:
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString(),
    });
  }
};

// NEW COMMENTS
export const newComments = (commentData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_COMMENT_REQUEST });

    const config = {
      headers: { 'Content-Type': 'application/json' },
    };

    const { data } = await axios.put(
      `${BACKEND_URL}/api/blogs/comment`,
      commentData,
      config
    );

    dispatch({ type: NEW_COMMENT_SUCCESS, payload: data });
    toast.success(data.message);
  } catch (error) {
    dispatch({
      type: NEW_COMMENT_FAIL,
      payload:
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString(),
    });
  }
};

// Get All Comments
export const getAllComment = (commentId) => async (dispatch) => {
  try {
    dispatch({ type: ALL_COMMENT_REQUEST });

    const config = {
      headers: { 'Content-Type': 'application/json' },
    };
    const { data } = await axios.get(
      `${BACKEND_URL}/api/blogs/comment/comments?id=${commentId}`,
      config
    );

    dispatch({ type: ALL_COMMENT_SUCCESS, payload: data.comments });
  } catch (error) {
    dispatch({
      type: ALL_COMMENT_FAIL,
      payload:
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString(),
    });
  }
};

// Delete COMMENTS
export const deleteComments = (commentId, blogId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_COMMENT_REQUEST });

    const config = {
      headers: { 'Content-Type': 'application/json' },
    };

    const { data } = await axios.delete(
      `${BACKEND_URL}/api/blogs/comment?blogId=${blogId}&id=${commentId}`,
      config
    );

    dispatch({ type: DELETE_COMMENT_SUCCESS, payload: data });
    toast.success(data.message);
  } catch (error) {
    dispatch({
      type: DELETE_COMMENT_FAIL,
      payload:
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString(),
    });
  }
};

// Clearing Errors
export const clearError = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
