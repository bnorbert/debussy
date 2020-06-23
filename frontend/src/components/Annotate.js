import { render } from "react-dom";
import axios from 'axios';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Annotate extends Component {
  constructor(props) {
    super(props)
    this.onChangeCategory = this.onChangeCategory.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      project_id: this.props.match.params.id,
      category: '',
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
        console.log(response);
        this.setState({data: response.data});
      });
  }

  onChangeCategory(e) {
    this.setState({
      category: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    console.log("SENDING...");
    const { dispatch, userInfo } = this.props;

    const img = `data:image/jpeg;base64,${this.state.data}`;
    const obj = JSON.stringify({
      project: this.state.project_id,
      annotator: userInfo.id,
      category: this.state.category,
      image: img,
      notes: 'some_notes',
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
    return (<div><img src={`data:image/jpeg;base64,${this.state.data}`} />
    <form onSubmit={this.onSubmit}>
                <div>
                    <label>Category:  </label>
                    <input
                      type="text"
                      value={this.state.category}
                      onChange={this.onChangeCategory}
                      />
                </div>
                <div>
                    <input type="submit"
                      value="Add annotation"/>
                </div>
            </form></div>)
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
