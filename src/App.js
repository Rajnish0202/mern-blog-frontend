import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home/Home';
import Layout from './components/layout/Layout';
import BlogDetails from './pages/BlogDetails/BlogDetails';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { loadUser } from './redux/actions/userAction';
import axios from 'axios';
import UserProfile from './pages/UserProfile/UserProfile';
import UpdateProfile from './pages/UserProfile/UpdateProfile';
import UpdatePassword from './pages/UserProfile/UpdatePassword';
import ForgotPassword from './pages/Auth/ForgotPassword';
import ResetPassword from './pages/Auth/ResetPassword';
import MyBlogs from './pages/MyBlogs/MyBlogs';
import WriteBlog from './pages/MyBlogs/WriteBlog';
import UpdateBlog from './pages/MyBlogs/UpdateBlog';
import Contact from './pages/UserProfile/Contact';
import About from './pages/About/About';

axios.defaults.withCredentials = true;

function App() {
  const { isLoggedIn } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [searchToggle, setSearchToggle] = useState(false);
  const [navToggle, setNavToggle] = useState(false);

  const navHandler = () => {
    setNavToggle(!navToggle);
    setSearchToggle(false);
  };

  const searchToggleHandler = () => {
    setSearchToggle(!searchToggle);
    setNavToggle(false);
  };

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <Router>
      <ToastContainer style={{ fontSize: '16px' }} position='top-center' />
      <Layout
        navToggle={navToggle}
        setNavToggle={setNavToggle}
        navHandler={navHandler}
        searchToggleHandler={searchToggleHandler}
      >
        <Routes>
          <Route path='/' element={<Home searchToggle={searchToggle} />} />
          <Route path='/about' element={<About />} />
          <Route path='/blog/:id' element={<BlogDetails />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/forgotpassword' element={<ForgotPassword />} />
          <Route
            path='/resetpassword/:resetToken'
            element={<ResetPassword />}
          />

          <Route
            path='/profile'
            element={isLoggedIn ? <UserProfile /> : <Login />}
          />

          <Route
            path='/updateprofile'
            element={isLoggedIn ? <UpdateProfile /> : <Login />}
          />

          <Route
            path='/changepassword'
            element={isLoggedIn ? <UpdatePassword /> : <Login />}
          />

          <Route
            path='/myblog'
            element={
              isLoggedIn ? <MyBlogs searchToggle={searchToggle} /> : <Login />
            }
          />

          <Route
            path='/writeblog'
            element={isLoggedIn ? <WriteBlog /> : <Login />}
          />

          <Route
            path='/editblog/:id'
            element={isLoggedIn ? <UpdateBlog /> : <Login />}
          />

          <Route
            path='/contact'
            element={isLoggedIn ? <Contact /> : <Login />}
          />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
