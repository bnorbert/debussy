import fetch from 'cross-fetch';
import axios from 'axios';

// -------------------- USER INFO --------------------

function extract_user_data(data) {
  return {
    id: data.user.id,
    username: data.user.username,
    email: data.user.email,
    token: data.token,
    logged_in: true
  }
}

function loggedInUser(data) {
  return {
    type: 'LOGGED_IN_USER',
    userInfo: extract_user_data(data)
  }
}

function registeredUser(data) {
  return {
    type: 'REGISTERED_USER',
    userInfo: extract_user_data(data)
  }
}

function loggedOutUser(json) {
  return {
    type: 'LOGGED_OUT_USER',
    userInfo: {id: -1, logged_in: false}
  }
}

export function logInUser(username, password) {
  return dispatch => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify({ username, password });

    return axios.post("http://localhost:8000/debussy/api/auth/login", body, config)
      .then(response => response.data)
      .then(data => dispatch(loggedInUser(data)))
      .catch(err => console.log(err))
  }
}

export function registerUser(username, password, email) {
  return dispatch => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify({ username, password, email });
    return axios.post("http://localhost:8000/debussy/api/auth/register", body, config)
      .then(response => response.data)
      .then(data => dispatch(registeredUser(data)))
      .catch(err => console.log(err))
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

export function fetchAllAnnotations(token) {
  return dispatch => {
    dispatch(requestAllAnnotations())
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`,
      },
    };
    return axios.get("http://localhost:8000/debussy/api/annotations/", config)
      .then(response => response.data)
      .then(json => dispatch(receiveAllAnnotations(json)))
  }
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

export function fetchAllProjects(token) {
  return dispatch => {
    dispatch(requestAllProjects());
    // Headers
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`,
      },
    };

    return axios.get("http://localhost:8000/debussy/api/projects/", config)
      .then(response => {
        return response.data
      })
      .then(project_list => dispatch(receiveAllProjects(project_list)))
  }
}

export function fetchAnnotationsAndProjects(token) {
  return dispatch => Promise.all([
    dispatch(fetchAllAnnotations(token)),
    dispatch(fetchAllProjects(token)),
  ])
}
