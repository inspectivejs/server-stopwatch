import * as types from './actionTypes';

export const setServerPath = (path) => ({
  type: types.SET_SERVER_PATH,
  payload: path,
});

export const setURL = (url) => ({
  type: types.SET_URL,
  payload: url
})

export const setMethod = (method) => ({
  type: types.SET_METHOD,
  payload: method
})