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
import AllAnnotations from './AllAnnotations';
import UserAnnotations from './UserAnnotations';


class App extends Component {
  constructor(props) {
    super(props);
    const { dispatch } = this.props;
    dispatch(fetchUserInfo());
  }

  render() {
    return (
    <Router>
        <div>
          <h2>Welcome to React Router Tutorial</h2>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <ul className="navbar-nav mr-auto">
            <li><Link to={'/frontend/'} className="nav-link">Home</Link></li>
            <li><Link to={'/frontend/project_list'} className="nav-link">Projects</Link></li>
            <li><Link to={'/frontend/all_annotations'} className="nav-link">All Annotations</Link></li>
            <li><Link to={'/frontend/my_annotations'} className="nav-link">My Annotations</Link></li>
          </ul>
          </nav>
          <hr />
          <Switch>
              <Route exact path='/frontend/' component={Home} />
              <Route path='/frontend/project_list' component={Projects} />
              <Route path='/frontend/all_annotations' component={AllAnnotations} />
              <Route path='/frontend/my_annotations' component={UserAnnotations} />
              <Route path='/frontend/projects/detail/:id' component={ProjectDetail} />
              <Route path='/frontend/projects/add' component={ProjectAdd} />
          </Switch>
        </div>
      </Router>
    );
  }
}
App.propTypes = {
  dispatch: PropTypes.func.isRequired
}
function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(App);