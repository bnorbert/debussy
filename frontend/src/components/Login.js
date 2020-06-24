import { render } from "react-dom";
import axios from 'axios';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logInUser } from './actions';
import { Form, Button, Container } from 'react-bootstrap';

class Login extends Component {
  constructor(props) {
    super(props)
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: '',
      password: '',
    }
  }
  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }
  onChangePassword(e) {
    this.setState({
      password: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();
    const { dispatch } = this.props;
    const { username, password } = this.state;
    dispatch(logInUser(username, password))

    this.props.history.push('/frontend/');
  }

  render() {
    const { userInfo } = this.props;
    return (<Container>
          <Form onSubmit={this.onSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" value={this.state.username} onChange={this.onChangeUsername} />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" value={this.state.password} onChange={this.onChangePassword} />
            </Form.Group>
            <Button variant="outline-primary" type="submit">
              Login
            </Button>
          </Form></Container>
        )
  }
}

Login.propTypes = {
  userInfo: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { userInfo } = state;
  return {
    userInfo
  };
}

export default connect(mapStateToProps)(Login);
