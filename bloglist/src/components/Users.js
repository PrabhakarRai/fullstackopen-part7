import React, { useEffect, useState } from 'react';
import {
  Switch,
  Link,
  Route,
  useRouteMatch
} from 'react-router-dom';
import userServices from '../services/users';

const User = ({ userdata }) => {
  return (
    <tr>
      <td>
        <Link to={`/users/${userdata.id}`}>{userdata.name}</Link>
      </td>
      <td>{userdata.blogs.length}</td>
    </tr>
  );
};

const UserBlogs = ({ userdata }) => {
  if (userdata === null || userdata === undefined) {
    return null;
  }
  return (
    <div>
      <h2>{userdata.name}</h2>
      <p>Added Blogs</p>
      <ul>
        {userdata.blogs.map((b) => <li key={b.id}>{b.title}</li>)}
      </ul>
    </div>
  );
};

const Users = () => {
  const [users, setUsers] = useState([]);
  const match = useRouteMatch('/users/:id');
  const user = match
    ? users.find((u) => u.id === match.params.id)
    : null;

  useEffect(() => {
    const fetch = async () => {
      const res = await userServices.getAll();
      setUsers(res);
    };
    fetch();
  }, []);

  return (
    <Switch>
      <Route path='/users/:id'>
        <UserBlogs userdata={user} />
      </Route>
      <Route path='/users'>
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
      </Route>
    </Switch>
  );
};

export default Users;
