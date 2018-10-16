import { combineReducers } from 'redux';

// import all reducers
import stopWatchReducer from './stopWatchReducer';

//combine reducers
const reducers = combineReducers({
  server: stopWatchReducer,
})

export default reducers;