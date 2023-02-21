import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  clearError,
  deleteBlogs,
  deleteComments,
  getAllComment,
  getBlogDetails,
  newComments,
} from '../../redux/actions/blogActions';
import styles from './BlogDetails.module.css';
import bannerImg from '../../assets/HeroImg.jpg';
import { toast } from 'react-toastify';
import MetaData from '../../utils/MetaData';
import moment from 'moment';
import DOMPurify from 'dompurify';
import { FaComment, FaComments, FaEdit, FaTrash } from 'react-icons/fa';
import {
  DELETE_BLOG_RESET,
  DELETE_COMMENT_RESET,
  NEW_COMMENT_RESET,
} from '../../redux/constants/blogConstant';
import Loader from '../../components/Loader/Loader';
import Comment from '../../components/comment/Comment';
import CommentBox from '../../components/comment/CommentBox';
import { confirmDelete } from '../../utils/deleteAlert';

const BlogDetails = () => {
  const { loading, error, blog } = useSelector((state) => state.blogDetails);
  const { user } = useSelector((state) => state.user);
  const {
    loading: deleteLoading,
    error: deleteError,
    isDeleted,
  } = useSelector((state) => state.blogActions);
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  const blogDeleteHandler = (id) => {
    dispatch(deleteBlogs(id));
  };

  // COMMENT FUNCTION

  const { success, error: commentError } = useSelector(
    (state) => state.newComment
  );
  const { isDeleted: commentDeleted, error: deleteCommentError } = useSelector(
    (state) => state.commentAction
  );

  const {
    comments,
    loading: commentLoading,
    error: commentsError,
  } = useSelector((state) => state.allComments);

  const [showComment, setShowComment] = useState(false);
  const [addComment, setAddComment] = useState(false);
  const [commentInput, setCommentInput] = useState('');

  const addCommentHandler = (e) => {
    e.preventDefault();

    if (!commentInput) {
      return toast.error('Please write comment!');
    }

    const myForm = new FormData();

    myForm.set('comment', commentInput);
    myForm.set('blogId', id);
    dispatch(newComments(myForm));
    setAddComment(false);
    setShowComment(true);
  };

  const commentHandler = (commentId, blogId) => {
    dispatch(deleteComments(commentId, blogId));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }

    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearError());
    }

    if (commentError) {
      toast.error(commentError);
      dispatch(clearError());
    }

    if (success) {
      dispatch(getBlogDetails(id));
      dispatch({ type: NEW_COMMENT_RESET });
      setAddComment(null);
    }

    if (isDeleted) {
      navigate('/');
      dispatch({ type: DELETE_BLOG_RESET });
      dispatch(clearError());
    }

    if (deleteCommentError) {
      toast.error(deleteCommentError);
      dispatch(clearError());
    }

    if (commentDeleted) {
      // getBlogDetails(id);
      dispatch({ type: DELETE_COMMENT_RESET });
    }

    if (commentsError) {
      toast.error(commentsError);
      dispatch(clearError());
    }

    dispatch(getBlogDetails(id));
    dispatch(getAllComment(id));
  }, [
    id,
    dispatch,
    error,
    deleteError,
    navigate,
    isDeleted,
    success,
    commentError,
    deleteCommentError,
    commentDeleted,
    commentsError,
  ]);

  return (
    <>
      <MetaData title={`Blog Details: ${blog._id}`} />
      <section className={styles.details}>
        {loading && <Loader />}
        <div className={styles.banner}>
          <img
            src={
              blog?.category === 'nature'
                ? 'https://res.cloudinary.com/dukdn1bpp/image/upload/v1676887262/MyCollections/nature_act9tl.jpg'
                : bannerImg && blog?.category === 'adventure'
                ? 'https://res.cloudinary.com/dukdn1bpp/image/upload/v1676887400/MyCollections/adventure_k9fxnn.jpg'
                : bannerImg && blog?.category === 'melody'
                ? 'https://res.cloudinary.com/dukdn1bpp/image/upload/v1676887343/MyCollections/melody_lwovfm.jpg'
                : bannerImg && blog?.category === 'travel'
                ? 'https://res.cloudinary.com/dukdn1bpp/image/upload/v1676887713/MyCollections/travel_bia7sm.jpg'
                : bannerImg && blog?.category === 'love'
                ? 'https://res.cloudinary.com/dukdn1bpp/image/upload/v1676887702/MyCollections/romance_cgio0i.jpg'
                : bannerImg && blog?.category === 'historical'
                ? 'https://res.cloudinary.com/dukdn1bpp/image/upload/v1676887529/MyCollections/Historical_uatjp4.jpg'
                : bannerImg && blog?.category === 'beach'
                ? 'https://res.cloudinary.com/dukdn1bpp/image/upload/v1676887461/MyCollections/beach_mxfwve.jpg'
                : bannerImg && blog?.category === 'music'
                ? 'https://res.cloudinary.com/dukdn1bpp/image/upload/v1676993563/MyCollections/musics_ccglbh.jpg'
                : bannerImg && blog?.category === 'safari'
                ? 'https://res.cloudinary.com/dukdn1bpp/image/upload/v1676993568/MyCollections/safari_n2bgcv.jpg'
                : bannerImg && blog?.category === 'sports'
                ? 'https://res.cloudinary.com/dukdn1bpp/image/upload/v1676993561/MyCollections/sports_zbotze.jpg'
                : bannerImg
            }
            alt={blog.title}
          />

          {/* {coverImages &&
            coverImages.map((img) =>
              img?.category === blog?.category ? (
                <img src={img.src} key={img.id} alt={blog?.title} />
              ) : (
                <img
                  src='https://res.cloudinary.com/dukdn1bpp/image/upload/v1676892720/MyCollections/HeroImg_y5dhdm.jpg'
                  alt={blog?.title}
                />
              )
            )} */}

          <div className={styles.back}>
            <Link to='/'>&larr; Back</Link>
          </div>
        </div>
        <div className={styles.blogDetails}>
          <div className={styles.titles}>
            <div className={styles.contant}>
              <div className={styles.author}>
                <Link to={`/users/${blog?.author?._id}`}>
                  <img
                    src={blog?.author?.avataar?.url}
                    alt={blog?.author?.avataar?.public_id}
                    title={blog?.author?.name}
                  />
                </Link>
                <p title={blog?.author?.name}>
                  {window.innerWidth > 600
                    ? `${blog?.author?.name}`
                    : `${blog?.author?.name.split(' ')[0]}`}
                </p>
              </div>
              <div className={styles.moreDetails}>
                <p>
                  {blog?.createdAt !== blog?.updatedAt
                    ? `UpdatedAt: ${moment(blog?.updatedAt).format(
                        'MM Do YYYY, h:mm:ss a'
                      )}`
                    : `CreatedAt: ${moment(blog?.createdAt).format(
                        'MM Do YYYY, h:mm:ss a'
                      )}`}
                </p>
                <b>
                  <span>Category: </span>
                  {blog?.category}
                </b>
              </div>
            </div>
            <div className={styles.post}>
              <div>
                <h3>{blog.title}</h3>
                <div className='underline'></div>
              </div>
              {blog?.author?._id === user?._id ? (
                <div className={styles.action}>
                  <Link to={`/editBlog/${blog._id}`} className={styles.editBtn}>
                    <button>
                      <FaEdit />
                    </button>
                  </Link>
                  <button
                    disabled={deleteLoading ? true : false}
                    onClick={() => confirmDelete(blog?._id, blogDeleteHandler)}
                  >
                    <FaTrash />
                  </button>
                </div>
              ) : (
                ''
              )}
            </div>
          </div>
          <Link to={`${blog?.image?.url}`} target='_blank'>
            <div className={styles.imageContainer}>
              <img src={blog?.image?.url} alt={blog?.image?.public_id} />
            </div>
          </Link>
          <div
            className={styles.desc}
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(blog?.description),
            }}
          ></div>
          {/* Comments */}
          <hr />
          <div className={styles.commentLink}>
            <button
              className='--btn'
              onClick={() => setAddComment(!addComment)}
            >
              <FaComment size={25} color='brown' />
              <p>Add Comment</p>
            </button>
            {blog?.comments && blog?.comments?.length > 0 && (
              <button
                className='--btn'
                onClick={() => setShowComment(!showComment)}
              >
                <span className='--flex-align'>
                  <FaComments size={25} color='brown' />
                  <p>
                    {blog?.comments?.length}{' '}
                    {blog?.comments?.length > 1 ? 'Comments' : 'Comment'}
                  </p>
                </span>
              </button>
            )}
          </div>

          {addComment && (
            <CommentBox
              addCommentHandler={addCommentHandler}
              commentInput={commentInput}
              setCommentInput={setCommentInput}
            />
          )}

          {blog?.comments && blog?.comments?.length > 0 && showComment && (
            <Comment
              showComment={showComment}
              setShowComment={setShowComment}
              comments={comments}
              user={user}
              commentHandler={commentHandler}
              loading={commentLoading}
              blogId={blog?._id}
            />
          )}
        </div>
      </section>
    </>
  );
};

export default BlogDetails;
