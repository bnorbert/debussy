// Contact.js

import React, { Component } from 'react';
import { render } from "react-dom";
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchAllProjects } from './actions';

class Projects extends Component {
  constructor(props) {
    super(props);
    const { dispatch, userInfo } = this.props;
    dispatch(fetchAllProjects(userInfo.token));
  }

  render() {
    const { projects, userInfo } = this.props
    console.log("IN PROJECTS")
    console.log(userInfo)

    return (
      <div>
      <ul>
        {projects.map(project => {
          return (
            <li key={project.id}>
              id: {project.id}, name: {project.name}, owner: {project.owner}, is private: {project.private}, categories: {project.categories}
              <Link to={"/frontend/projects/detail/" + project.id} className="nav-link" >DETAIL</Link>
            </li>
          );
        })}
      </ul>
      <Link to={"/frontend/projects/add"} className="nav-link" >Add project</Link>
      </div>
    );
  }
}

Projects.propTypes = {
  projects: PropTypes.array.isRequired,
  userInfo: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { projects, userInfo } = state
  return {
    projects,
    userInfo
  }
}

export default connect(mapStateToProps)(Projects);
