import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Card from '../../components/Card/Card';
import Loader from '../../components/Loader/Loader';
import { clearError, updatePassword } from '../../redux/actions/userAction';
import { UPDATE_PASSWORD_RESET } from '../../redux/constants/userConstant';
import MetaData from '../../utils/MetaData';
import styles from './UserProfile.module.css';

const UpdatePassword = () => {
  const { loading, isUpdated, error } = useSelector(
    (state) => state.userProfile
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const updatePasswordSubmit = (e) => {
    e.preventDefault();

    if (!oldPassword || !newPassword || !confirmPassword) {
      return toast.error('All fields are required.');
    }

    if (newPassword !== confirmPassword) {
      return toast.error('New and Confirm password must be match.');
    }

    if (newPassword.length < 6 || confirmPassword.length < 6) {
      return toast.error('Password must be 6 characters.');
    }

    const passwords = {
      oldPassword,
      newPassword,
      confirmPassword,
    };

    dispatch(updatePassword(passwords));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }

    if (isUpdated) {
      navigate('/profile');
      dispatch({ type: UPDATE_PASSWORD_RESET });
    }
  }, [error, isUpdated, navigate, dispatch]);

  return (
    <>
      <MetaData title={`Update Password`} />
      {loading && <Loader />}
      <section className={styles.profile}>
        <div className='settings'>
          <ul>
            {window.innerWidth <= 768 && (
              <Link to='/'>
                <li>Home</li>
              </Link>
            )}
            <Link to='/profile'>
              <li>Profile</li>
            </Link>
            <Link to={`/updateprofile`}>
              <li>Update Profile</li>
            </Link>
            <Link to={`/changepassword`}>
              <li className='active'>Change Password</li>
            </Link>
            <Link to={`/contact`}>
              <li>Contact</li>
            </Link>
          </ul>
        </div>
        <div className={styles.profileContainer}>
          <h2>Update Password</h2>
          <div className={styles.infoBox}>
            <form onSubmit={updatePasswordSubmit}>
              <div className={styles.formGroup}>
                <label>Old Password:</label>
                <input
                  type='password'
                  placeholder='Old Password'
                  value={oldPassword}
                  required
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </div>
              <div className={styles.formGroup}>
                <label>New Password:</label>
                <input
                  type='password'
                  placeholder='New Password'
                  value={newPassword}
                  required
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Confirm Password:</label>
                <input
                  type='password'
                  placeholder='Confirm Password'
                  value={confirmPassword}
                  required
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              <input
                type='submit'
                value='Update Password'
                className='--btn --btn-primary'
                disabled={loading ? true : false}
              />
            </form>
            <div className={styles.details}>
              <Card style={{ background: 'brown', color: '#fff' }}>
                <h3>Password Change Instructions:</h3>
                <div
                  className='underline'
                  style={{ background: '#fff', marginBottom: '.5rem' }}
                ></div>
                <p>Old password must be match.</p>
                <p>New password and Confirm password must be match.</p>
                <p>
                  New password and Confirm password must be greater than 6
                  characters.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default UpdatePassword;
