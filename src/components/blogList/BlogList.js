import React, { useEffect, useState } from 'react';
import Card from '../Card/Card';
import styles from './BlogList.module.css';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { FaComment, FaComments, FaEdit, FaTrash } from 'react-icons/fa';
import DOMPurify from 'dompurify';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { Spinner } from '../Loader/Loader';
import Comment from '../comment/Comment';
import CommentBox from '../comment/CommentBox';
import {
  clearError,
  deleteComments,
  getAllComment,
  newComments,
} from '../../redux/actions/blogActions';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
  DELETE_COMMENT_RESET,
  NEW_COMMENT_RESET,
} from '../../redux/constants/blogConstant';
import { confirmDelete } from '../../utils/deleteAlert';

const BlogList = ({
  blogs,
  user,
  deleteLoading,
  blogDeleteHandler,
  loading,
}) => {
  const { success, error } = useSelector((state) => state.newComment);
  const { isDeleted, error: deleteCommentError } = useSelector(
    (state) => state.commentAction
  );

  const {
    comments,
    loading: commentLoading,
    error: commentError,
  } = useSelector((state) => state.allComments);

  const dispatch = useDispatch();

  const [showComment, setShowComment] = useState(null);
  const [addComment, setAddComment] = useState(null);
  const [commentInput, setCommentInput] = useState('');
  const [blogId, setBlogId] = useState('');

  const toggle = (i) => {
    if (addComment === i) {
      return setAddComment(null);
    }

    setAddComment(i);
  };

  const toggleComment = (i, id) => {
    if (showComment === i) {
      return setShowComment(null);
    }

    setShowComment(i);
    dispatch(getAllComment(id));
  };

  const addCommentHandler = (e) => {
    e.preventDefault();

    if (!commentInput) {
      return toast.error('Please write comment!');
    }

    const myForm = new FormData();

    myForm.set('comment', commentInput);
    myForm.set('blogId', blogId);

    dispatch(newComments(myForm));
  };

  const commentHandler = (commentId, blogId) => {
    dispatch(deleteComments(commentId, blogId));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    if (deleteCommentError) {
      toast.error(deleteCommentError);
      dispatch(clearError());
    }

    if (success) {
      dispatch(getAllComment(blogId));
      dispatch({ type: NEW_COMMENT_RESET });
      setAddComment(null);
    }

    if (isDeleted) {
      dispatch({ type: DELETE_COMMENT_RESET });
      dispatch(getAllComment(blogId));
    }

    if (commentError) {
      toast.error(commentError);
      dispatch(clearError());
    }
  }, [
    error,
    dispatch,
    success,
    blogId,
    isDeleted,
    deleteCommentError,
    commentError,
  ]);

  return (
    <>
      <div className={styles.blogList}>
        {loading && <Spinner />}
        {blogs &&
          blogs.map((blog, i) => {
            return (
              <Card key={blog._id}>
                <div className={styles.blog}>
                  <div className={styles.head}>
                    <code>
                      {blog?.createdAt !== blog?.updatedAt
                        ? `UpdatedAt: ${moment(blog?.updatedAt).format(
                            'MM Do YYYY, h:mm:ss a'
                          )}`
                        : `CreatedAt: ${moment(blog?.createdAt).format(
                            'MM Do YYYY, h:mm:ss a'
                          )}`}
                    </code>
                    <b>
                      <span>Category: </span>
                      {blog.category}
                    </b>
                  </div>
                  <div className={styles.post}>
                    <div>
                      <h3>
                        <Link to={`/blog/${blog._id}`}>{blog.title}</Link>
                      </h3>
                      <div className='underline'></div>
                    </div>
                    <div>
                      {blog?.author?._id === user?._id ? (
                        <div className={styles.action}>
                          <Link
                            to={`/editBlog/${blog._id}`}
                            className={styles.editBtn}
                          >
                            <button>
                              <FaEdit />
                            </button>
                          </Link>
                          <button
                            disabled={deleteLoading ? true : false}
                            onClick={() =>
                              confirmDelete(blog?._id, blogDeleteHandler)
                            }
                          >
                            <FaTrash />
                          </button>
                        </div>
                      ) : (
                        ''
                      )}
                    </div>
                  </div>
                  <Link to={`/blog/${blog?._id}`}>
                    <div className={styles.imageBox}>
                      <img src={blog?.image.url} alt={blog?.image.public_id} />
                    </div>
                  </Link>
                  <div className={styles.desc}>
                    <span
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(
                          blog.description.substring(0, 300)
                        ),
                      }}
                    ></span>{' '}
                    <Link to={`/blog/${blog._id}`}>...Read more</Link>
                  </div>
                </div>
                <div className={styles.commentLink}>
                  <button
                    className='--btn'
                    onClick={() => [toggle(i), setBlogId(blog?._id)]}
                  >
                    <FaComment size={25} color='brown' />
                    <p>Add Comment</p>
                  </button>
                  {blog?.comments && blog?.comments?.length > 0 && (
                    <button
                      className='--btn'
                      onClick={() => toggleComment(i, blog?._id)}
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
                {addComment === i && (
                  <CommentBox
                    addCommentHandler={addCommentHandler}
                    commentInput={commentInput}
                    setCommentInput={setCommentInput}
                    addComment={addComment}
                  />
                )}

                {comments && comments?.length > 0 && showComment === i && (
                  <Comment
                    showComment={showComment}
                    comments={comments}
                    user={user}
                    commentHandler={commentHandler}
                    loading={commentLoading}
                    blogId={blog?._id}
                  />
                )}
              </Card>
            );
          })}
      </div>
    </>
  );
};

export default BlogList;
