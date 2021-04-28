import React,  { useState } from 'react';

const BlogDetails = ({
  visible,
  id,
  url,
  likes,
  createdByUser,
  loggedInUser,
  handleLikeClick,
  handleDeleteClick,
}) => {
  if (!visible) {
    return null;
  }
  return (
    <div className='blogDetails'>
      <span> URL ---: <a href={url} target={'_blank'} rel={'noreferrer'}>{url}</a></span><br />
      <span> Likes -: <b>{likes}</b></span><br />
      <button onClick={handleLikeClick(id, likes + 1)}>Like This Blog</button>
      {loggedInUser === createdByUser ? <button onClick={handleDeleteClick(id)}>Delete</button> : ''}
    </div>
  );
};

const Blog = ({ data, username, updateLikesHandler, deleteBlogHandler }) => {
  const [visible, setVisible] = useState(false);

  const toggleText = visible ? 'hide' : 'view';

  const blogStyle = {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  };
  const handleToggleVisibility = () => {
    setVisible(!visible);
  };
  const handleLikeClick = (id, likes) => () => {
    updateLikesHandler(id, likes);
  };
  const handleDeleteClick = (id) => () => {
    deleteBlogHandler(id);
  };
  return (
    <div style={blogStyle} className='blog'>
      <span>{data.title} - {data.author} </span>
      <button onClick={handleToggleVisibility}>{toggleText}</button>
      <BlogDetails
        visible={visible}
        id={data.id}
        url={data.url}
        likes={data.likes}
        createdByUser={data.user.username}
        loggedInUser={username}
        handleLikeClick={handleLikeClick}
        handleDeleteClick={handleDeleteClick}
      />
    </div>
  );
};

export default Blog;
