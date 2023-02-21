import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader/Loader';
import { clearError, resetPassword } from '../../redux/actions/userAction';
import MetaData from '../../utils/MetaData';
import styles from './Auth.module.css';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.forgotPassword);
  const { resetToken } = useParams();
  const navigate = useNavigate();

  const formSubmit = (e) => {
    e.preventDefault();

    if (!password) {
      return toast.error('Please enter a password.');
    }

    if (password.length < 6) {
      return toast.error('Password must be upto 6 characters.');
    }

    if (password !== confirmPassword) {
      return toast.error('Password must be match.');
    }

    const myForm = new FormData();
    myForm.set('password', password);
    myForm.set('confirmPassword', confirmPassword);

    dispatch(resetPassword(myForm, resetToken));
    navigate('/login');
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  return (
    <>
      <MetaData title='Reset Password' />
      {loading && <Loader />}
      <div className={`${styles.form} ${styles.forgot}`}>
        <form onSubmit={formSubmit}>
          <h2>Reset Password</h2>
          <div className={styles.formGroup}>
            <label>Password:</label>
            <input
              type='password'
              placeholder='New Password'
              value={password}
              required
              name='password'
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Password:</label>
            <input
              type='password'
              placeholder='Confirm Password'
              value={confirmPassword}
              name='confirmPassword'
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
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

export default ResetPassword;
