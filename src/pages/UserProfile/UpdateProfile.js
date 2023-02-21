import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import MetaData from '../../utils/MetaData';
import styles from './UserProfile.module.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { toast } from 'react-toastify';
import {
  clearError,
  loadUser,
  updateProfile,
} from '../../redux/actions/userAction';
import { UPDATE_USER_RESET } from '../../redux/constants/userConstant';
import Loader from '../../components/Loader/Loader';

const UpdateProfile = () => {
  const { user } = useSelector((state) => state.user);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');
  const [image, setImage] = useState();
  const [imagePreview, setImagePreview] = useState();

  const { loading, isUpdated, error } = useSelector(
    (state) => state.userProfile
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const updateProfileSubmit = (e) => {
    e.preventDefault();

    if (!image) {
      return toast.error('Please provide your profile avataar!');
    }

    const myForm = new FormData();

    myForm.set('name', name);
    myForm.set('avataar', image);
    myForm.set('bio', bio);

    dispatch(updateProfile(myForm));
  };

  const updateProfileDataChange = (e) => {
    if (e.target.name === 'avataar') {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagePreview(reader.result);
          setImage(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  useEffect(() => {
    if (user) {
      setName(user?.name);
      setBio(user?.bio);
      setEmail(user?.email);
      setImagePreview(user?.avataar?.url);
    }

    if (error) {
      toast.error(error);
      dispatch(clearError());
    }

    if (isUpdated) {
      navigate('/profile');
      dispatch({ type: UPDATE_USER_RESET });
      dispatch(loadUser());
    }
  }, [user, error, dispatch, navigate, isUpdated]);

  return (
    <>
      <MetaData title={`Update Profile`} />
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
              <li className='active'>Update Profile</li>
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
          <h2>Update Profile</h2>
          <form onSubmit={updateProfileSubmit} encType='multipart/form-data'>
            <div className={styles.formGroup}>
              <label>Name:</label>
              <input
                type='text'
                placeholder='Name'
                value={name}
                name='name'
                required
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Email:</label>
              <input
                type='email'
                placeholder='Email'
                disabled
                value={email}
                required
              />
              <code>Email cannot be changed.</code>
            </div>
            <div className={styles.formGroup}>
              <label>Bio:</label>
              <ReactQuill
                theme='snow'
                name='bio'
                value={bio}
                required
                onChange={(e) => setBio(e)}
                modules={UpdateProfile.modules}
                formats={UpdateProfile.formats}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Avataar:</label>
              <input
                type='file'
                name='avataar'
                accept='image/*'
                onChange={updateProfileDataChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Avataar Preview:</label>
              <img src={imagePreview} alt='preview' />
            </div>
            <input
              type='submit'
              value='Update Profile'
              className='--btn --btn-primary'
              disabled={loading ? true : false}
            />
          </form>
        </div>
      </section>
    </>
  );
};

UpdateProfile.modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['clean'],
  ],
};

UpdateProfile.formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'color',
  'background',
  'list',
  'bullet',
  'indent',
  'link',
  'video',
  'image',
  'code-block',
  'align',
];

export default UpdateProfile;
