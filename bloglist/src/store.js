import { createStore, combineReducers } from 'redux';
import notificationReducer from './reducers/notification';
import blogReducer from './reducers/blog';

const reducers = combineReducers({
  notification: notificationReducer,
  blogs: blogReducer
});

const store = createStore(reducers);

export default store;