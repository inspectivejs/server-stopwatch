import * as types from './actionTypes';


export const setServerPath = (path) => ({
  type: types.SET_SERVER_PATH,
  payload: path,
});

export const setURL = (url) => ({
  type: types.SET_URL,
  payload: url
});

export const setMethod = (method) => ({
  type: types.SET_METHOD,
  payload: method
});

export const updateHeader = (value, key) => ({
  type: types.UPDATE_HEADER,
  payload: value,
  key: key
});

export const removeHeader = (key) => ({
  type: types.REMOVE_HEADER,
  payload: key
});

export const addHeader = (key, value) => ({
  type: types.ADD_HEADER,
  key: key,
  payload: value
})

export const setHeaderName = (name) => ({
  type: types.SET_HEADER_NAME,
  payload: name
});

export const setHeaderValue = (value) => ({
  type: types.SET_HEADER_VALUE,
  payload: value
});