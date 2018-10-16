import * as types from '../actions/actionTypes';

const initialState = {
  filePath: '',
  data: null,
  requests: 0,
  schema: '',
  URL: "http://localhost:3000",
  method: "GET",
  headers: {
    "Accept": "*/*",
    "User-Agent": "Server-StopWatch",
  },
  newHeaderName: '',
  newHeaderValue: '',
}

const stopWatchReducer = (state=initialState, action) => {
  switch(action.type){
    case types.SET_DATA:
      return {
        ...state,
        data: [...state.data, action.payload]
      }
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
      return {
        ...state,
        method: action.payload,
      };
    case types.SET_REQUESTS:
      return {
        ...state,
        requests: action.payload
      }
    case types.UPDATE_HEADER:
      let {key, payload} = action;
      let newHeaders = {...state.headers}
      newHeaders[key] = payload;
      return {
        ...state,
        headers: {...newHeaders}
      };
    case types.SET_SCHEMA:
      return {
        ...state,
        schema: action.payload
      };
    case types.REMOVE_HEADER:
      key = action.payload
      newHeaders = {...state.headers};
      delete newHeaders[key];
      return {
        ...state,
        headers: {...newHeaders}
      };

    case types.SET_HEADER_NAME:
      return {
        ...state,
        newHeaderName: action.payload
      };

    case types.SET_HEADER_VALUE:
      return {
        ...state,
        newHeaderValue: action.payload
      };
    case types.ADD_HEADER:
      newHeaders = {...state.headers};
      newHeaders[action.key] = action.payload;

      return {
        ...state,
        headers: {...newHeaders},
        newHeaderName: '',
        newHeaderValue: ''
      }
    default:
      return state;
  }
}

export default stopWatchReducer;