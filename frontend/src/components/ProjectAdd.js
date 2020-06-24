import { render } from "react-dom";
import axios from 'axios';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Form, Button, Container } from 'react-bootstrap';

class ProjectAdd extends Component {
  constructor(props) {
    super(props)
    if(!this.props.userInfo.logged_in) {
      this.props.history.push('/frontend/login');
    }
    this.onChangeProjectName = this.onChangeProjectName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeCategories = this.onChangeCategories.bind(this);
    this.onChangeVisibility = this.onChangeVisibility.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      project_name: '',
      description: '',
      categories:'',
      visibility: 'public',
    }
  }
  onChangeProjectName(e) {
    this.setState({
      project_name: e.target.value
    });
  }
  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    })
  }
  onChangeCategories(e) {
    this.setState({
      categories: e.target.value
    })
  }
  onChangeVisibility(e) {
    this.setState({
      visibility: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();
    const { visibility } = this.state
    let isprivate = false;
    if (visibility == "public") {
      isprivate = false;
    }
    else {
      isprivate = true;
    }
    const obj = {
      name: this.state.project_name,
      description: this.state.description,
      categories: this.state.categories,
      private: isprivate,
      annotations: []
    };
    const { userInfo } = this.props;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${userInfo.token}`,
      },
    };

    axios.post('http://localhost:8000/debussy/api/projects/', obj, config)
        .then(res => console.log(res));
    this.props.history.push('/frontend/');
  }

  render() {
    return (<Container>
      <Form onSubmit={this.onSubmit}>
        <Form.Group controlId="formBasicProjectName">
          <Form.Label>Project Name</Form.Label>
          <Form.Control type="text" value={this.state.project_name} onChange={this.onChangeProjectName} />
        </Form.Group>
        <Form.Group controlId="formBasicDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control type="text" value={this.state.description} onChange={this.onChangeDescription} />
        </Form.Group>
        <Form.Group controlId="formBasicCategories">
          <Form.Label>Category</Form.Label>
          <Form.Control type="text" value={this.state.categories} onChange={this.onChangeCategories} />
        </Form.Group>
        <Form.Group controlId="formBasicVisibility">
          <Form.Label>Visibility</Form.Label>
          <Form.Control as="select" value={this.state.visibility} onChange={this.onChangeVisibility}>
            <option value="public">Public</option>
            <option value="private">Private</option>
          </Form.Control>
        </Form.Group>
        <Button variant="outline-primary" type="submit" className="mb-2">Add Project</Button>
        </Form>
      </Container>)
  }
}

ProjectAdd.propTypes = {
  userInfo: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { userInfo } = state;
  return {
    userInfo
  }
}

export default connect(mapStateToProps)(ProjectAdd);
