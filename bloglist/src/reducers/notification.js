const initNotification = {
  content: '',
  type: '',
};

const notificationReducer = (state = initNotification, action) => {
  switch (action.type) {
  case 'UPDATE_NOTIFI':
    return action.data;
  case 'CLEAR_NOTIFI':
    return '';
  default:
    return state;
  }
};

export const updateNotification = (text, type) => ({
  data: {
    content: text,
    type: type,
  },
  type: 'UPDATE_NOTIFI',
});

export const clearNotification = () => ({
  type: 'CLEAR_NOTIFI',
});

export const setNotification = (text, type, time = 10000) => {
  return (dispatch) => {
    dispatch({
      type: 'UPDATE_NOTIFI',
      data: {
        content: text,
        type: type,
      },
    });
    setTimeout(() => dispatch(clearNotification()), time);
  };
};

export default notificationReducer;