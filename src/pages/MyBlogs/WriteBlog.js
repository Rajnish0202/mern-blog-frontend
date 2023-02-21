import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader/Loader';
import { clearError, newBlogs } from '../../redux/actions/blogActions';
import { NEW_BLOG_RESET } from '../../redux/constants/blogConstant';
import MetaData from '../../utils/MetaData';
import styles from './MyBlog.module.css';

const WriteBlog = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState();
  const [imagePreview, setImagePreview] = useState();

  const { loading, error, success } = useSelector((state) => state.newBlog);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addNewBlogSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set('title', title);
    myForm.set('category', category);
    myForm.set('description', description);
    myForm.set('image', image);

    dispatch(newBlogs(myForm));
  };

  const createProductImageChange = (e) => {
    if (e.target.name === 'image') {
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
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }

    if (success) {
      navigate('/myblog');
      dispatch({ type: NEW_BLOG_RESET });
    }
  }, [error, dispatch, success, navigate]);

  return (
    <>
      <MetaData title='Write Blog' />
      <section className={styles.writeBlog}>
        {loading && <Loader />}
        <form
          className={styles.form}
          encType='multiform/form-data'
          onSubmit={addNewBlogSubmitHandler}
        >
          <div className={styles.formGroup}>
            <label>Title:</label>
            <input
              type='text'
              name='title'
              placeholder='Title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Category:</label>
            <input
              type='text'
              name='category'
              placeholder='Category'
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Description:</label>
            <ReactQuill
              theme='snow'
              name='description'
              value={description}
              onChange={(e) => setDescription(e)}
              modules={WriteBlog.modules}
              formats={WriteBlog.formats}
              placeholder='Your felling...'
            />
          </div>
          <div className={styles.formGroup}>
            <label>Image:</label>
            <input
              type='file'
              name='image'
              accept='image/*'
              onChange={createProductImageChange}
            />
          </div>
          {imagePreview && (
            <div className={styles.formGroup}>
              <label>Image Peview:</label>
              <img src={imagePreview} alt='preview' />
            </div>
          )}

          <input
            type='submit'
            className='--btn --btn-primary'
            value='New Post'
            style={{ width: '100%' }}
            disabled={loading ? true : false}
          />
        </form>
      </section>
    </>
  );
};

WriteBlog.modules = {
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

WriteBlog.formats = [
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

export default WriteBlog;
