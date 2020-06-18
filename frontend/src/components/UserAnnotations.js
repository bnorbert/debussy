import React, { Component } from 'react';
import { render } from "react-dom";
import PropTypes from 'prop-types';
import { fetchAllAnnotations } from './actions';
import { connect } from 'react-redux'

class UserAnnotations extends Component {
  constructor(props) {
    super(props);
    const { dispatch, userInfo } = this.props;
    dispatch(fetchAllAnnotations(userInfo.token))
  }

  render() {
    const { annotations, userInfo } = this.props;

    if (userInfo != null && annotations) {
      return (
        <ul>
          {annotations.map(annotation => {
            if (userInfo.id == annotation.annotator) {
              return (
                <li key={annotation.id}>
                  {annotation.id}, {annotation.notes}, {annotation.category}
                </li>
              );
            }
          })}
        </ul>
      );
    }
    return (<h2>This place is empty</h2>);
  }
}

UserAnnotations.propTypes = {
  annotations: PropTypes.array.isRequired,
  userInfo: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { annotations, userInfo } = state
  return {
    annotations,
    userInfo
  }
}

export default connect(mapStateToProps)(UserAnnotations)
