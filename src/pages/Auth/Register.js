import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader/Loader';
import { clearError, register } from '../../redux/actions/userAction';
import MetaData from '../../utils/MetaData';
import { validateEmail } from '../../utils/validateEmail';
import styles from './Auth.module.css';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { error, isLoggedIn, loading } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!name || !password || !email) {
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
      name,
      email,
      password,
    };

    dispatch(register(formData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }

    if (isLoggedIn) {
      navigate('/profile');
    }
  }, [error, dispatch, isLoggedIn, navigate]);

  return (
    <>
      <MetaData title='Register' />
      <div className={`${styles.auth} ${styles.register}`}>
        {loading && <Loader />}

        <div className={styles.form}>
          <form onSubmit={formSubmit}>
            <h2>Register</h2>
            <div className={styles.formGroup}>
              <label>User Name</label>
              <input
                type='text'
                placeholder='User Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
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
                Register
              </button>
            </div>
            <span className={styles.links}>
              <Link to='/'>Home</Link>
              <p>&nbsp; Already have an account? &nbsp;</p>
              <Link to='/login'>Login</Link>
            </span>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
