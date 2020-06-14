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
    }

    const { userInfo } = this.props;
    const config = {
      headers: {
        'Authorization': `Token ${userInfo.token}`,
      },
    };
    axios.get('http://localhost:8000/debussy/api/projects/generate_image/', config)
      .then(response => {
        response.data.arrayBuffer().then((buffer) => {
          let base64Flag = 'data:image/jpeg;base64,';

          let binary = '';
          let bytes = [].slice.call(new Uint8Array(buffer));
          bytes.forEach((b) => binary += String.fromCharCode(b));
          let imageStr = btoa(binary);

          this.setState({ source: base64Flag + imageStr});
        });
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
            <img src={this.state.source} />;
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
