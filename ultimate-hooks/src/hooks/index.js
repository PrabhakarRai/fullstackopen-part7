import { useEffect, useState } from 'react';
import axios from 'axios'

export const useResource = (baseUrl) => {
  let token = null;
  const [resources, setResources] = useState([]);

  const setToken = newToken => {
    token = `bearer ${newToken}`
  }
  
  const getAll = async () => {
    const response = await axios.get(baseUrl)
    setResources(response.data);
    return response.data
  }
  
  const create = async newObject => {
    const config = {
      headers: { Authorization: token },
    }
  
    const response = await axios.post(baseUrl, newObject, config)
    setResources(resources.concat(response.data));
    return response.data
  }
  
  const update = async (id, newObject) => {
    const response = await axios.put(`${ baseUrl } /${id}`, newObject)
    const updatedItem = response.data;
    setResources(resources.map((i) => i.id !== updatedItem.id ? i : updatedItem));
    return response.data
  }

  useEffect(() => {
    getAll();
  }, []);
  
  const services = {
    setToken,
    getAll,
    create,
    update,
  }

  return [resources, services];
}

export const useField = (type) => {
    const [value, setValue] = useState('');
    const onChange = (e) => {
      setValue(e.target.value);
    }
    return {
      type,
      value,
      onChange,
    }
}
