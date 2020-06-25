import { render } from "react-dom";
import axios from 'axios';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Form, Container, Button, Alert } from 'react-bootstrap';

class ProjectDetail extends Component {
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
      current_user_id: this.props.userInfo.id,
      project_id: this.props.match.params.id,
      project_user_id: null,
      project_name: '',
      description: '',
      categories:'',
      visibility: 'public',
      annotation_ids: []
    }
  }

  componentDidMount() {
    const { userInfo } = this.props;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${userInfo.token}`,
      },
    };
    axios.get("http://localhost:8000/debussy/api/projects/" + this.state.project_id + "/", config)
      .then(response => response.data)
      .then(project_details => this.setState({
        project_name: project_details.name,
        project_user_id: parseInt(project_details.owner),
        description: project_details.description,
        categories: project_details.categories,
        visibility: project_details.private ? 'private' : 'public',
        annotation_ids: project_details.annotations
      }))
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
      owner: this.state.current_user_id,
      description: this.state.description,
      categories: this.state.categories,
      private: isprivate,
      annotations: this.state.annotation_ids
    };
    console.log("saving")
    const { userInfo } = this.props;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${userInfo.token}`,
      },
    };

    axios.patch('http://localhost:8000/debussy/api/projects/' + this.state.project_id + '/', obj, config)
        .then(response => console.log(response));
    //this.props.history.push('/frontend/');
  }

  render() {

    let submitButton;
    if (this.state.project_user_id == this.state.current_user_id)
      submitButton = (
          <Button variant="outline-primary" type="submit" className="mb-2">Save</Button>
      );
    else {
      submitButton = <Alert variant="warning">You cannot update this project as you are not the owner of it</Alert>
    }
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
        {submitButton}
        </Form>
        <Link to={"/frontend/projects/annotate/" + this.state.project_id}><Button variant="outline-primary">Annotate</Button></Link>
      </Container>
      )
  }
}

ProjectDetail.propTypes = {
  userInfo: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { userInfo } = state;
  return {
    userInfo
  }
}

export default connect(mapStateToProps)(ProjectDetail);
