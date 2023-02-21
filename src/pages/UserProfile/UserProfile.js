import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { capitalizeText } from '../../utils/captilizeFirstLetter';
import MetaData from '../../utils/MetaData';
import styles from './UserProfile.module.css';
import DOMPurify from 'dompurify';
import Loader from '../../components/Loader/Loader';

const UserProfile = () => {
  const { user, loading } = useSelector((state) => state.user);

  return (
    <>
      <MetaData title={`${capitalizeText(user?.name)}'s Profile`} />
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
              <li className='active'>Profile</li>
            </Link>
            <Link to={`/updateprofile`}>
              <li>Update Profile</li>
            </Link>
            <Link to={`/changepassword`}>
              <li>Change Password</li>
            </Link>
            <Link to={`/contact`}>
              <li>Contact</li>
            </Link>
          </ul>
        </div>
        <div className={styles.profileContainer}>
          <div>
            <h2>User Profile</h2>
            <div className={styles.imageContainer}>
              <img src={user?.avataar?.url} alt={user?.avataar?.public_id} />
            </div>
          </div>
          <div>
            <div className={styles.content}>
              <strong>Name:</strong>
              <p>{user?.name}</p>
            </div>
            <div className={styles.content}>
              <strong>Email:</strong>
              <p>{user?.email}</p>
            </div>
            <div className={styles.content}>
              <strong>Bio:</strong>
              <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(user?.bio),
                }}
              ></div>
            </div>
            <Link
              to={`/profile/${user?._id}`}
              className='--btn --btn-primary'
              style={{ width: '20rem', margin: 'auto' }}
            >
              Edit Profile
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default UserProfile;
