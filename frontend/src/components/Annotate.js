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
      source: null,
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
    const { dispatch } = this.props;

    //this.props.history.push('/frontend/');
  }

  render() {
    const { userInfo } = this.props;
    return (<form onSubmit={this.onSubmit}>
            <img src={`data:image/jpeg;base64,${this.state.data}`} />
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
            </form>)
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
