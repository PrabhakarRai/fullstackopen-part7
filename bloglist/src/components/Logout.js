import React from 'react';

const Logout = ({ user, logoutHandler }) => (
  <>
    <span>{user.name} logged in. </span>
    <button onClick={logoutHandler}>logout</button>
  </>
);

export default Logout;