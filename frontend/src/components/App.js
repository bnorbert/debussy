import { render } from "react-dom";
import { fetchUserInfo } from './actions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import {withRouter} from 'react-router-dom';

import Home from './Home';
import Projects from './Projects';
import ProjectAdd from './ProjectAdd';
import ProjectDetail from './ProjectDetail';
import Annotate from './Annotate';
import AllAnnotations from './AllAnnotations';
import UserAnnotations from './UserAnnotations';
import Login from './Login';
import Register from './Register';


import { Navbar, Nav } from 'react-bootstrap';


class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
    <Router>
        <div>
            <Navbar bg="dark" variant="dark">
            <Navbar.Brand as={Link} to={'/frontend/'}>debussy</Navbar.Brand>
            <Nav className="mr-auto">
              <Nav.Link as={Link} to={'/frontend/'}>Home</Nav.Link>
              <Nav.Link as={Link} to={'/frontend/project_list'}>Projects</Nav.Link>
              <Nav.Link as={Link} to={'/frontend/all_annotations'}>All Annotations</Nav.Link>
              <Nav.Link as={Link} to={'/frontend/my_annotations'}>My Annotations</Nav.Link>
              <Nav.Link as={Link} to={'/frontend/login'}>Login</Nav.Link>
              <Nav.Link as={Link} to={'/frontend/register'}>Register</Nav.Link>
            </Nav>
          </Navbar>
          <hr />
          <Switch>
              <Route exact path='/frontend/' component={Home} />
              <Route path='/frontend/project_list' component={Projects} />
              <Route path='/frontend/all_annotations' component={AllAnnotations} />
              <Route path='/frontend/my_annotations' component={UserAnnotations} />
              <Route path='/frontend/projects/detail/:id' component={ProjectDetail} />
              <Route path='/frontend/projects/add' component={ProjectAdd} />
              <Route path='/frontend/projects/annotate/:id' component={Annotate} />
              <Route path='/frontend/login' component={Login} />
              <Route path='/frontend/register' component={Register} />
          </Switch>
        </div>
      </Router>
    );
  }
}
App.propTypes = {
  userInfo: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
}
function mapStateToProps(state) {
  const { userInfo } = state;
  return {
    userInfo
  };
}

export default connect(mapStateToProps)(App);
