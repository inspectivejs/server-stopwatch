import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from './reducers/index';

//create store, attaching reducer functionality to it
const store = createStore(
  reducers,
  composeWithDevTools()
);

export default store;