import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader/Loader';
import { clearError, forgotPassword } from '../../redux/actions/userAction';
import MetaData from '../../utils/MetaData';
import { validateEmail } from '../../utils/validateEmail';
import styles from './Auth.module.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.forgotPassword);

  const formSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      return toast.error('Please enter an email.');
    }

    if (!validateEmail(email)) {
      return toast.error('Please enter a valid email.');
    }

    const myForm = new FormData();
    myForm.set('email', email);

    dispatch(forgotPassword(myForm));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  return (
    <>
      <MetaData title='Forgot Password' />
      {loading && <Loader />}
      <div className={`${styles.form} ${styles.forgot}`}>
        <form onSubmit={formSubmit}>
          <h2>Forgot Password</h2>
          <div className={styles.formGroup}>
            <label>Email:</label>
            <input
              type='email'
              placeholder='Please enter your email...'
              value={email}
              name='email'
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button type='submit' className='--btn --btn-primary'>
            Send Reset Password
          </button>
        </form>
      </div>
    </>
  );
};

export default ForgotPassword;
