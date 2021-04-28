import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createBlog = async (data) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, data, config);
  return response.data;
};

const updateLikes = async (id, likes) => {
  const config = {
    headers: { Authorization: token },
  };
  const data = { likes: likes };
  const response = await axios.put(`${ baseUrl }/${id}`, data, config);
  return response.data;
};

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.delete(`${ baseUrl }/${id}`, config);
  return response;
};

const exportList = {
  getAll,
  createBlog,
  updateLikes,
  deleteBlog,
  setToken,
};
export default exportList;