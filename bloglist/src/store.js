import { createStore, combineReducers } from 'redux';
import notificationReducer from './reducers/notification';
import blogReducer from './reducers/blog';
import userReducer from './reducers/user';

const reducers = combineReducers({
  notification: notificationReducer,
  blogs: blogReducer,
  user: userReducer,
});

const store = createStore(reducers);

export default store;