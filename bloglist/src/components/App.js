import React, { useState, useEffect, useRef } from 'react';
import blogService from '../services/blogs';
import loginService from '../services/login';
import { SuccessNotification, ErrorNotification } from './Notification';
import { useDispatch, useSelector } from 'react-redux';
import { updateNotification, clearNotification } from '../reducers/notification';
import { initBlog, createBlog, updateBlog, deleteBlog } from '../reducers/blog';
import Blog from './Blog';
import Login from './Login';
import Logout from './Logout';
import Toggleable from './Toggleable';
import BlogCreateForm from './BlogCreateForm';
import '../index.css';

const App = () => {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const blogs = useSelector((s) => s.blogs);
  const blogFormRef = useRef();

  const setSuccessMsgWrapper = (msg, clearTime = 10000) => {
    dispatch(updateNotification(msg, 'SUCCESS'));
    setTimeout(() => dispatch(clearNotification()), clearTime);
  };

  const setErrorMsgWrapper = (msg, clearTime = 10000) => {
    dispatch(updateNotification(msg, 'ERROR'));
    setTimeout(() => dispatch(clearNotification()), clearTime);
  };

  useEffect(() => {
    const fetchInitialBlogs = async () => {
      const blogs = await blogService.getAll();
      dispatch(initBlog(blogs));
    };
    fetchInitialBlogs();
  }, []);

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedInBlogUser');
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const loginSubmitHandler = async (username, password) => {
    try {
      const user = await loginService.login({ username, password });
      blogService.setToken(user.token);
      window.localStorage.setItem(
        'loggedInBlogUser', JSON.stringify(user)
      );
      setSuccessMsgWrapper('Logged in Successfully');
      setUser(user);
    } catch (e) {
      setErrorMsgWrapper('Login Error - incorrect username or password');
    }
  };
  const blogSubmitHandler = async (author, title, url) => {
    try {
      const res = await blogService.createBlog({ author, title, url });
      dispatch(createBlog(res));
      setSuccessMsgWrapper(`Added - ${res.title} into blogs list.`);
      blogFormRef.current.toggleVisibility();
    } catch (e) {
      setErrorMsgWrapper(e.message);
    }
  };
  const updateLikesHandler = async (id, likes) => {
    try {
      const res = await blogService.updateLikes(id, likes);
      dispatch(updateBlog(res));
      // const newBlogs = blogs.map(b => b.id !== res.id ? b : res).sort((a, b) => {
      //   return b.likes - a.likes;
      // });
      setSuccessMsgWrapper(`Liked ${res.title} by ${res.author}`);
    } catch (e) {
      setErrorMsgWrapper(e.message);
    }
  };
  const deleteBlogPost = async (id) => {
    try {
      const blog = blogs.find((b) => b.id === id);
      if (blog) {
        const conf = window.confirm(`Remove blog ${blog.title} by ${blog.author}`);
        if (conf) {
          const res = await blogService.deleteBlog(id);
          if (res.status === 204) {
            dispatch(deleteBlog(blog.id));
            setSuccessMsgWrapper(`Deleted ${blog.title}`);
          } else {
            setErrorMsgWrapper('Unknown error');
          }
        }
      }
    } catch (e) {
      setErrorMsgWrapper(e.message);
    }
  };
  const logoutHandler = () => {
    window.localStorage.removeItem('loggedInBlogUser');
    blogService.setToken(null);
    setUser(null);
    setSuccessMsgWrapper('Logged out successfully');
  };
  if (user === null) {
    return (
      <>
        <ErrorNotification />
        <SuccessNotification />
        <h1>Login to the application</h1>
        <Login
          formSubmitHandler={loginSubmitHandler}
        />
      </>
    );
  }
  return (
    <div>
      <ErrorNotification />
      <SuccessNotification />
      <h2>Blogs</h2>
      <Logout user={user} logoutHandler={logoutHandler} />
      {blogs.map(blog =>
        <Blog
          key={blog.id}
          data={blog}
          updateLikesHandler={updateLikesHandler}
          deleteBlogHandler={deleteBlogPost}
          username={user.username}
        />
      )}
      <Toggleable buttonLable='Add New Blog' ref={blogFormRef}>
        <BlogCreateForm
          formSubmitHandler={blogSubmitHandler}
        />
      </Toggleable>
    </div>
  );
};

export default App;