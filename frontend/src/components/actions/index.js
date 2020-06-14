import fetch from 'cross-fetch';
import axios from 'axios';

// -------------------- USER INFO --------------------

function requestUserInfo() {
  return {
    type: 'REQUEST_USER_INFO'
  }
}

function receiveUserInfo(json) {
  return {
    type: 'RECECIVED_USER_INFO',
    userInfo: json
  }
}

export function fetchUserInfo() {
  return dispatch => {
    dispatch(requestUserInfo());
    return fetch("http://localhost:8000/debussy/api/users/current_user_info/")
      .then(response => response.json())
      .then(json => dispatch(receiveUserInfo(json)))
  }
}



// -------------------- ANNOTATIONS --------------------

function requestAllAnnotations() {
    return {
      type: 'REQUEST_ALL_ANNOTATIONS'
    }
}

function receiveAllAnnotations(json) {
  return {
    type: 'RECEIVED_ALL_ANNOTATIONS',
    annotations: json,
  }
}

export function fetchAllAnnotations() {
  return dispatch => {
    dispatch(requestAllAnnotations())
    return fetch("http://localhost:8000/debussy/api/annotations/")
      .then(response => response.json())
      .then(json => dispatch(receiveAllAnnotations(json)))
  }
}

export function fetchUserAnnotationsData() {
  return dispatch => Promise.all([
    dispatch(fetchUserInfo()),
    dispatch(fetchAllAnnotations())
  ])
}

// ------------------------ PROJECTS ------------------------

function requestAllProjects() {
  return {
    type: 'REQUEST_ALL_PROJECTS'
  }
}

function receiveAllProjects(project_list) {
  return {
    type: 'RECEIVE_ALL_PROJECTS',
    projects: project_list
  }
}

export function fetchAllProjects() {
  return dispatch => {
    dispatch(requestAllProjects());
    return axios.get("http://localhost:8000/debussy/api/projects/")
      .then(response => {
        return response.data
      })
      .then(project_list => dispatch(receiveAllProjects(project_list)))
  }
}
