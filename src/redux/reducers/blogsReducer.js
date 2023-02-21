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
  DELETE_BLOG_RESET,
  DELETE_BLOG_SUCCESS,
  DELETE_COMMENT_FAIL,
  DELETE_COMMENT_REQUEST,
  DELETE_COMMENT_SUCCESS,
  MY_BLOG_FAIL,
  MY_BLOG_REQUEST,
  MY_BLOG_SUCCESS,
  NEW_BLOG_FAIL,
  NEW_BLOG_REQUEST,
  NEW_BLOG_RESET,
  NEW_BLOG_SUCCESS,
  NEW_COMMENT_FAIL,
  NEW_COMMENT_REQUEST,
  NEW_COMMENT_RESET,
  NEW_COMMENT_SUCCESS,
  UPDATE_BLOG_FAIL,
  UPDATE_BLOG_REQUEST,
  UPDATE_BLOG_RESET,
  UPDATE_BLOG_SUCCESS,
} from '../constants/blogConstant';

export const blogsReducer = (state = { blogs: [] }, action) => {
  switch (action.type) {
    case ALL_BLOG_REQUEST:
      return {
        loading: true,
        blogs: [],
      };

    case ALL_BLOG_SUCCESS:
      return {
        loading: false,
        blogs: action.payload.blogs,
        categories: action.payload.categories,
        limit: action.payload.limit,
        total: action.payload.total,
        page: action.payload.page,
        blogCounts: action.payload.blogCounts,
      };

    case ALL_BLOG_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const blogDetailsReducer = (state = { blog: {} }, action) => {
  switch (action.type) {
    case BLOG_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case BLOG_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        blog: action.payload.blog,
      };

    case BLOG_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const myBlogsReducer = (state = { blogs: [] }, action) => {
  switch (action.type) {
    case MY_BLOG_REQUEST:
      return {
        loading: true,
        blogs: [],
      };

    case MY_BLOG_SUCCESS:
      return {
        loading: false,
        blogs: action.payload.blogs,
        limit: action.payload.limit,
        total: action.payload.total,
        page: action.payload.page,
        blogCounts: action.payload.blogCounts,
        categories: action.payload.categories,
      };

    case MY_BLOG_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const newBlogsReducer = (state = { blog: {} }, action) => {
  switch (action.type) {
    case NEW_BLOG_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case NEW_BLOG_SUCCESS:
      return {
        loading: false,
        blog: action.payload.blog,
        success: action.payload.success,
      };

    case NEW_BLOG_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case NEW_BLOG_RESET:
      return {
        ...state,
        success: false,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const actionBlogsReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_BLOG_REQUEST:
    case DELETE_BLOG_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case UPDATE_BLOG_SUCCESS:
      return {
        loading: false,
        isUpdated: action.payload.success,
      };

    case DELETE_BLOG_SUCCESS:
      return {
        loading: false,
        isDeleted: action.payload.success,
      };

    case UPDATE_BLOG_FAIL:
    case DELETE_BLOG_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case UPDATE_BLOG_RESET:
      return {
        ...state,
        isUpdated: false,
      };

    case DELETE_BLOG_RESET:
      return {
        ...state,
        isDeleted: false,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

// New Comments
export const newCommentReducer = (state = {}, action) => {
  switch (action.type) {
    case NEW_COMMENT_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case NEW_COMMENT_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
      };

    case NEW_COMMENT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case NEW_COMMENT_RESET:
      return {
        ...state,
        success: false,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

// Comment Action
export const commentReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_COMMENT_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case DELETE_COMMENT_SUCCESS:
      return {
        loading: false,
        isDeleted: action.payload.success,
      };

    case DELETE_COMMENT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case DELETE_BLOG_RESET:
      return {
        ...state,
        isDeleted: false,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

// All Comments

export const commentsReducer = (state = { comments: [] }, action) => {
  switch (action.type) {
    case ALL_COMMENT_REQUEST:
      return {
        loading: true,
        blogs: [],
      };

    case ALL_COMMENT_SUCCESS:
      return {
        loading: false,
        comments: action.payload,
      };

    case ALL_COMMENT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
