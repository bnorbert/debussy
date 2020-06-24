// Contact.js

import React, { Component } from 'react';
import { render } from "react-dom";
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchAllProjects } from './actions';

import { CardGroup, Card, Container, Button, Row } from 'react-bootstrap';

class Projects extends Component {
  constructor(props) {
    super(props);
    const { dispatch, userInfo } = this.props;
    if(!userInfo.logged_in){
      this.props.history.push('/frontend/login');
    }
    dispatch(fetchAllProjects(userInfo.token));
  }

  render() {
    const { projects, userInfo } = this.props
    console.log("IN PROJECTS")
    console.log(userInfo)

    return (
      <Container>
          <Link to={"/frontend/projects/add"}><Button variant="outline-success" size="lg" className="mb-2">New project</Button></Link>
          {projects.map(project => {
            return (
              <Row key={project.id}>
                <Card style={{ width: '40rem' }} className="mb-2">
                  <Card.Header as="h5">{project.name}</Card.Header>
                  <Card.Body>
                    <Card.Title>Categories: {project.categories}</Card.Title>
                    <Card.Text>
                      {project.description}
                    </Card.Text>
                    <Link to={"/frontend/projects/detail/" + project.id}><Button variant="outline-primary">Details</Button></Link>
                  </Card.Body>
                </Card>
              </Row>
            );
          })}
      </Container>
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
