import React, { useEffect, useState } from 'react';
import userServices from '../services/users';

const User = ({ userdata }) => {
  return (
    <tr>
      <td>{userdata.name}</td>
      <td>{userdata.blogs.length}</td>
    </tr>
  );
};

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await userServices.getAll();
      setUsers(res);
    };
    fetch();
  }, []);

  return (
    <div>
      <h1>Users</h1>
      <table>
        <thead>
          <tr>
            <th>Name of the User</th>
            <th>Blogs Created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => <User key={u.id} userdata={u} />)}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
