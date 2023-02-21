import React from 'react';
import styles from './Comment.module.css';

const CommentBox = ({ addCommentHandler, commentInput, setCommentInput }) => {
  return (
    <>
      <div className={styles.commentBox}>
        <form onSubmit={addCommentHandler}>
          <input
            type='text'
            placeholder='Comment...'
            value={commentInput}
            name='comment'
            onChange={(e) => setCommentInput(e.target.value)}
          />
          <input type='submit' value='Post' className='--btn --btn-primary' />
        </form>
      </div>
    </>
  );
};

export default CommentBox;
