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
    const { dispatch } = this.props;
    dispatch(fetchAllProjects());
  }

  render() {
    const { projects } = this.props

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
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { projects } = state
  return {
    projects
  }
}

export default connect(mapStateToProps)(Projects);
