import React from 'react';

const Logout = ({ user, logoutHandler }) => (
  <div>
    <span>{user.name} logged in. </span>
    <button onClick={logoutHandler}>logout</button>
  </div>
);

export default Logout;