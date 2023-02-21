import React from 'react';
import styles from './Header.module.css';
import {
  FaBars,
  FaFacebookSquare,
  FaGithubSquare,
  FaInstagramSquare,
  FaSearch,
  FaTwitterSquare,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { capitalizeText } from '../../utils/captilizeFirstLetter';
import { logout } from '../../redux/actions/userAction';

const Header = ({
  setNavToggle,
  navToggle,
  navHandler,
  searchToggleHandler,
}) => {
  const { isLoggedIn, user } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <div className={styles.header}>
      <div className={styles.bars}>
        <button className='--btn --btn-primary' onClick={navHandler}>
          <FaBars size={20} />
        </button>
        <div className={styles.searchToggle}>
          <button className='--btn' onClick={searchToggleHandler}>
            <FaSearch size={25} />
          </button>
        </div>
      </div>
      <nav
        className={
          navToggle ? `${styles.navbar} ${styles.active}` : `${styles.navbar}`
        }
      >
        <div className={styles.headerLeft}>
          <Link
            to='https://www.facebook.com/rajnish.kumar.169067'
            target='_blank'
          >
            <FaFacebookSquare size={30} />
          </Link>
          <Link to='https://twitter.com/Rajnishkum02' target='_blank'>
            <FaTwitterSquare size={30} />
          </Link>
          <Link to='https://github.com/Rajnish0202' target='_blank'>
            <FaGithubSquare size={30} />
          </Link>
          <Link to='https://www.instagram.com/rajnish.raichu92' target='_blank'>
            <FaInstagramSquare size={30} />
          </Link>
        </div>
        <div className={styles.headerCenter}>
          <ul className={styles.list}>
            <li className={styles.listItem} onClick={navHandler}>
              <Link to='/'>Home</Link>
            </li>
            <li className={styles.listItem} onClick={navHandler}>
              <Link to='/myblog'>MyBlog</Link>
            </li>
            <li className={styles.listItem} onClick={navHandler}>
              <Link to='/writeblog'>Write</Link>
            </li>
            <li className={styles.listItem} onClick={navHandler}>
              <Link to='/about'>About</Link>
            </li>
          </ul>
        </div>
        <div className={styles.headerRight}>
          {!isLoggedIn ? (
            <ul className={styles.list}>
              <li className={styles.listItem} onClick={navHandler}>
                <Link to='/login'>Login</Link>
              </li>
              <li className={styles.listItem} onClick={navHandler}>
                <Link to='/register'>Register</Link>
              </li>
            </ul>
          ) : (
            <ul className={styles.list}>
              <li className={`${styles.listItem} ${styles.responsive}`}>
                <Link to='/profile' className={styles.userLink}>
                  <span onClick={() => setNavToggle(!navToggle)}>
                    <img
                      src={user?.avataar?.url}
                      alt={user?.avataar?.public_id}
                      title={user?.name}
                    />
                  </span>
                  <div title={user?.name}>
                    {capitalizeText(user?.name).split(' ')[0]}
                  </div>
                </Link>
              </li>
              <li className={styles.listItem} onClick={navHandler}>
                <button
                  className={`${styles.logout} --btn`}
                  onClick={logoutHandler}
                >
                  Logout
                </button>
              </li>
            </ul>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Header;
