import React, { Component } from 'react';
import { render } from "react-dom";
import PropTypes from 'prop-types';
import { fetchAnnotationsAndProjects } from './actions';
import { connect } from 'react-redux';

import { Media, Container } from 'react-bootstrap';

class AllAnnotations extends Component {
  constructor(props) {
    super(props);
    const { dispatch, userInfo } = this.props;
    if(!userInfo.logged_in) {
      this.props.history.push('/frontend/login');
    }
    dispatch(fetchAnnotationsAndProjects(userInfo.token));
  }

  getProjectName(project_id) {
    const { projects } = this.props;
    for (var i = 0; i < projects.length; ++i) {
      if(projects[i].id == project_id) {
        return projects[i].name;
      }
    }
  }

  render() {
    const { annotations } = this.props;

    if (annotations) {
      return (
        <Container>
        <ul>
          {annotations.map(annotation => {
            return (
              <Media as="li" key={annotation.id}>
                <img
                  width={200}
                  height={200}
                  className="mr-3 mb-2 img-thumbnail"
                  src={`data:image/jpeg;base64,${annotation.image}`}
                  alt="Generic placeholder"
                />
                <Media.Body>
                  <h4>Project: {this.getProjectName(annotation.project)}</h4>
                  <h5>Category: {annotation.category}</h5>
                  <p>
                    Notes: {annotation.notes}
                  </p>
                </Media.Body>
              </Media>
            );
          })}
        </ul>
        </Container>
      );
    }
    return (<h2>This place is empty</h2>);
  }

}

AllAnnotations.propTypes = {
  isFetchingAnnotations: PropTypes.bool.isRequired,
  annotations: PropTypes.array.isRequired,
  projects: PropTypes.array.isRequired,
  userInfo: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { isFetchingAnnotations, annotations, projects, userInfo } = state
  return {
    isFetchingAnnotations,
    annotations,
    projects,
    userInfo
  }
}

export default connect(mapStateToProps)(AllAnnotations)
