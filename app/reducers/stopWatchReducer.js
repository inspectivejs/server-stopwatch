import * as types from '../actions/actionTypes';

const initialState = {
  filePath: '',
  URL: 'http://localhost:3000',
  method: 'GET',
  headers: {
    Accept: '*/*',
    'User Agent': 'HTTP Wizard'
  },
}

const stopWatchReducer = (state=initialState, action) => {
  switch(action.type){
    case types.SET_SERVER_PATH:
      return {
        ...state,
        filePath: action.payload,
      };
    case types.SET_URL:
      return {
        ...state,
        URL: action.payload,
      };
    case types.SET_METHOD:
      console.log(action.payload);
      return {
        ...state,
        method: action.payload,
      }
    default:
      return state;
  }
}

export default stopWatchReducer;