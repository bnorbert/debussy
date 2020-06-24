import { render } from "react-dom";
import axios from 'axios';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Container, Image, Button, Form } from 'react-bootstrap';

class Annotate extends Component {
  constructor(props) {
    super(props)
    if(!this.props.userInfo.logged_in) {
      this.props.history.push('/frontend/login');
    }
    this.onChangeCategory = this.onChangeCategory.bind(this);
    this.onChangeNotes = this.onChangeNotes.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.refreshImage = this.refreshImage.bind(this);

    this.state = {
      project_id: this.props.match.params.id,
      category: '',
      notes: '',
      data: null,
    }

    const { userInfo } = this.props;
    const config = {
      headers: {
        'Authorization': `Token ${userInfo.token}`,
      },
    };
    axios.get('http://localhost:8000/debussy/api/projects/generate_image/', config)
      .then(response => {
        this.setState({data: response.data});
      });
  }

  refreshImage(e) {
    e.preventDefault();

    const { userInfo } = this.props;
    const config = {
      headers: {
        'Authorization': `Token ${userInfo.token}`,
      },
    };
    axios.get('http://localhost:8000/debussy/api/projects/generate_image/', config)
      .then(response => {
        this.setState({data: response.data});
      });
  }

  onChangeCategory(e) {
    this.setState({
      category: e.target.value
    });
  }

  onChangeNotes(e) {
    this.setState({
      notes: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const { dispatch, userInfo } = this.props;

    const img = `data:image/jpeg;base64,${this.state.data}`;
    const obj = JSON.stringify({
      project: this.state.project_id,
      annotator: userInfo.id,
      category: this.state.category,
      notes: this.state.notes,
      image: img,
    });
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${userInfo.token}`,
      },
    };

    axios.post('http://localhost:8000/debussy/api/annotations/', obj, config)
        .then(res => this.props.history.push('/frontend/'))
        .catch(err => console.log(err.message));
  }

  render() {
    const { userInfo } = this.props;
    return (<Container>
      <Image src={`data:image/jpeg;base64,${this.state.data}`} rounded className="mb-2 border border-warning img-thumbnail"/>
      <Container>
        <Button variant="outline-info" className="mr-3 mb-2" onClick={this.refreshImage}>Refresh</Button>
      </Container>
      <Container>
        <Form onSubmit={this.onSubmit}>
          <Form.Group controlId="formBasicCategory">
            <Form.Label>Category</Form.Label>
            <Form.Control type="text" value={this.state.category} onChange={this.onChangeCategory} />
          </Form.Group>
          <Form.Group controlId="formBasicCategory">
            <Form.Label>Notes</Form.Label>
            <Form.Control as="textarea" rows="3" value={this.state.notes} onChange={this.onChangeNotes} />
          </Form.Group>
          <Button type="submit" variant="outline-primary">Add annotation</Button>
        </Form>
      </Container>
      </Container>)
  }
}

Annotate.propTypes = {
  userInfo: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { userInfo } = state;
  return {
    userInfo
  };
}

export default connect(mapStateToProps)(Annotate);
