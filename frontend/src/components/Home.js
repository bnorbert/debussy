// Home.js

import React, { Component } from 'react';
import { Jumbotron } from 'react-bootstrap';

class Home extends Component {
  render() {
    return (
        <div>
          <Jumbotron>
          <h1>What is it?</h1>
          <p>
            Debussy is an app made for anybody who wants to compose projects(datasets) by generating an image and annotating it. It also enables multi-person collaboration.
          </p>
        </Jumbotron>
        </div>
    );
  }
}

export default Home;
