const initUser = null;

const userReducer = (state = initUser, action) => {
  switch (action.type) {
  case 'USER_LOGIN':
    return action.data;
  case 'USER_LOGOUT':
    return null;
  default:
    return state;
  }
};

export const loginUser = (userData) => {
  return {
    type: 'USER_LOGIN',
    data: userData,
  };
};

export const logoutUser = () => {
  return {
    type: 'USER_LOGOUT',
  };
};

export default userReducer;
