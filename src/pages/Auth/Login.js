import React, { useEffect, useState } from 'react';
import MetaData from '../../utils/MetaData';
import styles from './Auth.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { validateEmail } from '../../utils/validateEmail';
import { clearError, login } from '../../redux/actions/userAction';
import Loader from '../../components/Loader/Loader';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { error, isLoggedIn, loading } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const formSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!password || !email) {
      return toast.error('All fields are required.');
    }

    if (password.length < 6) {
      return toast.error('Password must be upto 6 characters.');
    }

    if (password !== confirmPassword) {
      return toast.error('Password do not match.');
    }

    if (!validateEmail(email)) {
      return toast.error('Please enter a valid email.');
    }

    const formData = {
      email,
      password,
    };

    dispatch(login(formData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }

    if (isLoggedIn === true) {
      navigate('/profile');
    }
  }, [error, dispatch, isLoggedIn, navigate]);
  return (
    <>
      <MetaData title='Login' />
      <div className={`${styles.auth} ${styles.login}`}>
        {loading && <Loader />}
        <div className={styles.form}>
          <form onSubmit={formSubmit}>
            <h2>Login</h2>
            <div className={styles.formGroup}>
              <label>Email</label>
              <input
                type='email'
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Password</label>
              <input
                type='password'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Confirm Password</label>
              <input
                type='password'
                placeholder='Confirm Password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className={styles.formGroup}>
              <button className='--btn --btn-primary' type='submit'>
                Login
              </button>
            </div>
            <Link to='/forgotpassword'>Forgot Password?</Link>
            <span className={styles.links}>
              <Link to='/'>Home</Link>
              <p>&nbsp; Don't have an account? &nbsp;</p>
              <Link to='/register'>Register</Link>
            </span>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
