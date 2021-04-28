import React, { useState } from 'react';

const BlogCreateForm = ({ formSubmitHandler }) => {
  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');

  const authorHandler = (e) => {
    setAuthor(e.target.value);
  };
  const titleHandler = (e) => {
    setTitle(e.target.value);
  };
  const urlHandler = (e) => {
    setUrl(e.target.value);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    formSubmitHandler(author, title, url);
    setAuthor('');
    setTitle('');
    setUrl('');
  };

  return (
    <form onSubmit={submitHandler} className='blogCreateForm'>
      <div>
        <label htmlFor={'author'}>Author : </label>
        <input required={true} type='text' value={author} id={'author'} name='author' onChange={authorHandler} />
      </div>
      <div>
        <label htmlFor={'title'}>Title : </label>
        <input required={true} type='text' value={title} id={'title'} name='title' onChange={titleHandler} />
      </div>
      <div>
        <label htmlFor={'url'}>Url : </label>
        <input required={true} type='url' value={url} id={'url'} name='url' onChange={urlHandler} />
      </div>
      <button type='submit'>Add Note</button>
    </form>
  );
};

export default BlogCreateForm;
