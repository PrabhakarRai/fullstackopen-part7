import { createStore } from 'redux';
import
notificationReducer from './reducers/notification';

const store = createStore(notificationReducer);

export default store;