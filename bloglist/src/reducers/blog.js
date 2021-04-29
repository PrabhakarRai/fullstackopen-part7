const initBlogs = [];

const blogReducer = (state = initBlogs, action) => {
  switch (action.type) {
  case 'INIT_BLOG':
    return action.data.sort((a, b) => {
      return b.likes - a.likes;
    });
  case 'CREATE_BLOG':
    return state.concat(action.data);
  case 'UPDATE_BLOG':
    return state
      .map((b) => b.id !== action.data.id ? b : action.data)
      .sort((a, b) => {
        return b.likes - a.likes;
      });
    // case 'LIKE_BLOG':
    //   return state; // TODO
  case 'DELETE_BLOG':
    return state.filter((b) => b.id !== action.data.id);
  default:
    return state;
  }
};

export const initBlog = (blog) => {
  return {
    type: 'INIT_BLOG',
    data: blog
  };
};
export const createBlog = (blog) => {
  return {
    type: 'CREATE_BLOG',
    data: blog
  };
};

export const updateBlog = (blog) => {
  return {
    type: 'UPDATE_BLOG',
    data: blog,
  };
};

// export const likeBlog = (id) => {
//   return {
//     type: 'LIKE_BLOG',
//     data: {
//       id: id,
//     }
//   }
// }

export const deleteBlog = (id) => {
  return {
    type: 'DELETE_BLOG',
    data: {
      id: id,
    }
  };
};
export default blogReducer;