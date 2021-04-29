import React from 'react';
import { Link } from 'react-router-dom';
import Logout from './Logout';

const Menu = ({ user, logoutHandler }) => {
  const linkStyle = {
    paddingRight: 5,
    textColor: 'white',
  };
  const navStyle = {
    backgroundColor: 'gray',
    width: '100%',
    padding: '1vh',
  };
  return (
    <div style={navStyle}>
      <Link to='/' style={linkStyle}>Home</Link>
      <Link to='/blogs' style={linkStyle}>Blogs</Link>
      <Link to='/users' style={linkStyle}>Users</Link>
      {user && <Logout user={user} logoutHandler={logoutHandler} />}
    </div>
  );
};

export default Menu;
