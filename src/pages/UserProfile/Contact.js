import React, { useEffect, useState } from 'react';
import { BsGithub } from 'react-icons/bs';
import { GoLocation } from 'react-icons/go';
import { FaEnvelope, FaPhoneAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Card from '../../components/Card/Card';
import MetaData from '../../utils/MetaData';
import styles from './UserProfile.module.css';
import { toast } from 'react-toastify';
import { clearError, contactUs } from '../../redux/actions/contactAction';
import Loader from '../../components/Loader/Loader';

const Contact = () => {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const { loading, error, success } = useSelector((state) => state.contactUs);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const contactSubmitHandler = (e) => {
    e.preventDefault();

    if (!subject || !message) {
      return toast.error('Please provide all fields.');
    }

    const myForm = new FormData();

    myForm.set('subject', subject);
    myForm.set('message', message);

    dispatch(contactUs(myForm));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }

    if (success) {
      navigate('/contact');
      setSubject('');
      setMessage('');
    }
  }, [error, dispatch, success, navigate]);

  return (
    <>
      <MetaData title={`Contact Us`} />
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
              <li>Change Password</li>
            </Link>
            <Link to={`/contact`}>
              <li className='active'>Contact</li>
            </Link>
          </ul>
        </div>
        <div className={styles.profileContainer}>
          <h2>Contact Us</h2>
          <div className={styles.infoBox}>
            <form onSubmit={contactSubmitHandler}>
              <div className={styles.formGroup}>
                <label>Subject: </label>
                <input
                  type='text'
                  placeholder='Subject...'
                  value={subject}
                  name='subject'
                  required
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Message: </label>
                <textarea
                  placeholder='Message...'
                  value={message}
                  required
                  cols='30'
                  rows='10'
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>

              <input
                type='submit'
                value='Send Message'
                className='--btn --btn-primary'
                disabled={loading ? true : false}
              />
            </form>
            <div className={styles.details}>
              <Card style={{ background: 'brown', color: '#fff' }}>
                <h3>Our Contact Information</h3>
                <div
                  className='underline'
                  style={{ background: '#fff', marginBottom: '.5rem' }}
                ></div>
                <p>
                  Fill the form or contact us via other channels listed below
                </p>

                <div className={styles.icons}>
                  <span>
                    <FaPhoneAlt />
                    <p>8960395782</p>
                  </span>
                  <span>
                    <FaEnvelope />
                    <p>rajnish.0202kumar@gmail.com</p>
                  </span>
                  <span>
                    <GoLocation />
                    <p>Lucknow, U.P, India</p>
                  </span>
                  <span>
                    <BsGithub />
                    <p>
                      <Link
                        to='https://github.com/Rajnish0202/MERNInventory'
                        target='_blank'
                      >
                        https://github.com/Rajnish0202/MERNInventory
                      </Link>
                    </p>
                  </span>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
