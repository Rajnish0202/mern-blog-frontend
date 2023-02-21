import {
  CLEAR_ERRORS,
  CONTACT_US_FAIL,
  CONTACT_US_REQUEST,
  CONTACT_US_SUCCESS,
} from '../constants/contactConstant';
import axios from 'axios';
import { toast } from 'react-toastify';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const contactUs = (contactData) => async (dispatch) => {
  try {
    dispatch({ type: CONTACT_US_REQUEST });

    const config = { headers: { 'Content-Type': 'application/json' } };

    const { data } = await axios.post(
      `${BACKEND_URL}/api/contact`,
      contactData,
      config
    );

    dispatch({ type: CONTACT_US_SUCCESS, payload: data });
    toast.success(data.message);
  } catch (error) {
    dispatch({
      type: CONTACT_US_FAIL,
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
