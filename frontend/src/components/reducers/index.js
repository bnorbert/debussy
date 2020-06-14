import { combineReducers } from 'redux'

function isFetchingAnnotations(state = false, action) {
  switch (action.type) {
    case 'REQUEST_ALL_ANNOTATIONS':
      return true;
    case 'RECEIVED_ALL_ANNOTATIONS':
      return false;
    default:
      return state
  }
}

function annotations(state = [], action) {
  switch (action.type) {
    case 'RECEIVED_ALL_ANNOTATIONS':
      return action.annotations;
    default:
      return state
  }
}

function userInfo(state = {id: -1}, action) {
  switch (action.type) {
    case 'RECECIVED_USER_INFO':
      return action.userInfo;
    default:
      return state;
  }
}

function projects(state = [], action) {
  switch (action.type) {
    case 'RECEIVE_ALL_PROJECTS':
      return action.projects;
    default:
      return state;
  }
}

export default combineReducers({
  isFetchingAnnotations,
  annotations,
  userInfo,
  projects
});
