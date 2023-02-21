import React, { useEffect, useState } from 'react';
import BlogList from '../../components/blogList/BlogList';
import HeroBanner from '../../components/hero/HeroBanner';
import Sidebar from '../../components/sidebar/Sidebar';
import MetaData from '../../utils/MetaData';
import styles from './Home.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearError,
  deleteBlogs,
  getAllBlogs,
} from '../../redux/actions/blogActions';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { DELETE_BLOG_RESET } from '../../redux/constants/blogConstant';
import Loader from '../../components/Loader/Loader';
import Pagination from 'react-js-pagination';
import { BsEmojiFrown } from 'react-icons/bs';

const Home = ({ searchToggle }) => {
  const [sort, setSort] = useState({ sort: 'createdAt', order: 'desc' });
  const [filterCategory, setFilterCategory] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  const { user } = useSelector((state) => state.user);
  const { loading, error, blogs, total, limit, blogCounts, categories } =
    useSelector((state) => state.blogs);

  const {
    loading: deleteLoading,
    error: deleteError,
    isDeleted,
  } = useSelector((state) => state.blogActions);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const blogDeleteHandler = (id) => {
    dispatch(deleteBlogs(id));
  };

  const setCurrentPageNo = (e) => {
    setPage(e);
  };

  useEffect(() => {
    dispatch(getAllBlogs(page, sort, search, filterCategory));

    if (error) {
      toast.error(error);
      dispatch(clearError());
    }

    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearError());
    }

    if (isDeleted) {
      navigate('/');
      dispatch({ type: DELETE_BLOG_RESET });
    }
  }, [
    dispatch,
    error,
    deleteError,
    isDeleted,
    navigate,
    page,
    sort,
    search,
    filterCategory,
  ]);

  return (
    <>
      <MetaData title='Home' />
      {loading && <Loader />}
      <HeroBanner />
      <section className={styles.home}>
        {blogCounts === 0 ? (
          <section className='noBlog'>
            <div>
              <h3>No Blog Found!</h3>
              <BsEmojiFrown size={100} color='brown' />
            </div>

            <div>
              <h3>Want To Post Blog?</h3>
              <Link to='/writeblog'>Write Blog</Link>
            </div>
          </section>
        ) : (
          <BlogList
            loading={loading}
            blogs={blogs}
            user={user}
            deleteLoading={deleteLoading}
            blogDeleteHandler={blogDeleteHandler}
          />
        )}

        <Sidebar
          setSearch={setSearch}
          setFilterCategory={setFilterCategory}
          sort={sort}
          setSort={setSort}
          categories={categories}
          searchToggle={searchToggle}
        />
      </section>
      {total > blogCounts && blogCounts >= limit && (
        <div className='paginationBox'>
          <Pagination
            activePage={page}
            itemsCountPerPage={limit}
            totalItemsCount={total}
            onChange={setCurrentPageNo}
            nextPageText='Next'
            prevPageText='Prev'
            firstPageText='1st'
            lastPageText='Last'
            itemClass='page-item'
            linkClass='page-link'
            activeClass='pageItemActive'
            activeLinkClass='pageLinkActive'
          />
        </div>
      )}
    </>
  );
};

export default Home;
