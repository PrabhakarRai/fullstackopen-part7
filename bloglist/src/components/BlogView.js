import React, { useEffect, useState } from 'react';
import {
  Switch,
  Link,
  Route,
  useRouteMatch
} from 'react-router-dom';
import blogServices from '../services/blogs';

const BlogListing = ({ blogData }) => {
  return (
    <li>
      <Link to={`/blogs/${blogData.id}`}>{blogData.title}</Link>
    </li>
  );
};

const BlogInfo = ({ blogData, likeClickHandler }) => {
  if (blogData === null || blogData === undefined) {
    return null;
  }
  return (
    <div>
      <h1>{blogData.title}</h1>
      <a href={blogData.url}>{blogData.url}</a>
      <p>has {blogData.likes} likes</p>
      <button onClick={() => likeClickHandler(blogData.id, blogData.likes + 1)}>
        Like
      </button>
      <p>Added by {blogData.user.name}</p>
    </div>
  );
};

const BlogView = () => {
  const [blogs, setBlogs] = useState([]);
  const match = useRouteMatch('/blogs/:id');
  const blog = match
    ? blogs.find((b) => b.id === match.params.id)
    : null;

  useEffect(() => {
    const fetch = async () => {
      const res = await blogServices.getAll();
      setBlogs(res);
    };
    fetch();
  }, []);

  const likeClickHandler = async (id, likes) => {
    try {
      const res = await blogServices.updateLikes(id, likes);
      setBlogs(blogs
        .map((b) => b.id !== res.id ? b : res)
        .sort((a, b) => {
          return b.likes - a.likes;
        })
      );
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <Switch>
      <Route path='/blogs/:id'>
        <BlogInfo blogData={blog} likeClickHandler={likeClickHandler} />
      </Route>
      <Route path='/blogs'>
        <div>
          <h1>Blogs</h1>
          <ul>
            {blogs.map((b) => <BlogListing key={b.id} blogData={b} />)}
          </ul>
        </div>
      </Route>
    </Switch>
  );
};

export default BlogView;
