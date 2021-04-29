import React from 'react';
import { Link } from 'react-router-dom';

const Menu = () => {
  const padding = {
    paddingRight: 5
  };
  return (
    <div>
      <Link to='/' style={padding}>Home</Link>
      <Link to='/users' style={padding}>Users</Link>
    </div>
  );
};

export default Menu;
