import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader/Loader';
import {
  clearError,
  getBlogDetails,
  updateBlogs,
} from '../../redux/actions/blogActions';
import { UPDATE_BLOG_RESET } from '../../redux/constants/blogConstant';
import MetaData from '../../utils/MetaData';
import styles from './MyBlog.module.css';

const UpdateBlog = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState();
  const [oldImage, setOldImage] = useState();
  const [imagePreview, setImagePreview] = useState();

  const { loading, error, isUpdated } = useSelector(
    (state) => state.blogActions
  );

  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  const { blog } = useSelector((state) => state.blogDetails);

  useEffect(() => {
    if (blog && blog._id !== id) {
      dispatch(getBlogDetails(id));
    } else {
      setTitle(blog?.title);
      setCategory(blog?.category);
      setDescription(blog?.description);
      setOldImage(blog?.image);
    }

    if (error) {
      toast.error(error);
      dispatch(clearError());
    }

    if (isUpdated) {
      dispatch({ type: UPDATE_BLOG_RESET });
      navigate(`/blog/${id}`);
    }
  }, [dispatch, blog, id, error, isUpdated, navigate]);

  const updateBlogSubmitHandler = (e) => {
    e.preventDefault();

    if (!image) {
      return toast.error(`Please provide your blog's image !`);
    }

    const myForm = new FormData();
    myForm.set('title', title);
    myForm.set('category', category);
    myForm.set('description', description);
    myForm.set('image', image);

    dispatch(updateBlogs(myForm, id));
  };

  const createProductImageChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setImagePreview(reader.result);
        setImage(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <>
      <MetaData title='Update Blog' />
      <section className={styles.writeBlog}>
        {loading && <Loader />}
        <form
          className={styles.form}
          encType='multiform/form-data'
          onSubmit={updateBlogSubmitHandler}
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
              modules={UpdateBlog.modules}
              formats={UpdateBlog.formats}
              placeholder='Your felling...'
            />
          </div>
          <div className={styles.formGroup}>
            <label>Image:</label>
            <input
              type='file'
              name='image'
              accept='image/*'
              multiple
              onChange={createProductImageChange}
            />
          </div>
          {imagePreview && (
            <div className={styles.formGroup}>
              <label>Image Peview:</label>
              <img src={imagePreview} alt='preview' />
            </div>
          )}
          {!imagePreview && oldImage && (
            <div className={styles.formGroup}>
              <label>Image Peview:</label>
              <img src={oldImage.url} alt='preview' />
            </div>
          )}

          <input
            type='submit'
            className='--btn --btn-primary'
            value='Update Post'
            style={{ width: '100%' }}
            disabled={loading ? true : false}
          />
        </form>
      </section>
    </>
  );
};

UpdateBlog.modules = {
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

UpdateBlog.formats = [
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

export default UpdateBlog;
