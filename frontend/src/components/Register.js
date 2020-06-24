import { render } from "react-dom";
import axios from 'axios';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { registerUser } from './actions';
import { Form, Container, Button } from 'react-bootstrap';

class Register extends Component {
  constructor(props) {
    super(props)
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: '',
      email: '',
      password: '',
    }
  }
  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }
  onChangeEmail(e) {
    this.setState({
      email: e.target.value
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
    const { username, password, email } = this.state;
    dispatch(registerUser(username, password, email))

    this.props.history.push('/frontend/');
  }

  render() {
    const { userInfo } = this.props;
    return (
            <Container>
              <Form onSubmit={this.onSubmit}>
                <Form.Group controlId="formBasicUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control type="text" value={this.state.username} onChange={this.onChangeUsername} />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" value={this.state.email} onChange={this.onChangeEmail} />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" value={this.state.password} onChange={this.onChangePassword} />
                </Form.Group>
                <Button variant="outline-primary" type="submit">
                  Register
                </Button>
              </Form>
            </Container>)
  }
}

Register.propTypes = {
  userInfo: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { userInfo } = state;
  return {
    userInfo
  };
}

export default connect(mapStateToProps)(Register);
