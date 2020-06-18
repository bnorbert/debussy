import React, { Component } from 'react';
import { render } from "react-dom";
import PropTypes from 'prop-types';
import { fetchAllAnnotations } from './actions';
import { connect } from 'react-redux'

class AllAnnotations extends Component {
  constructor(props) {
    super(props);
    const { dispatch, userInfo } = this.props;
    dispatch(fetchAllAnnotations(userInfo.token));
  }

  render() {
    const { annotations } = this.props;

    if (annotations) {
      return (
        <ul>
          {annotations.map(annotation => {
            return (
              <li key={annotation.id}>
                {annotation.id}, {annotation.notes}, {annotation.category}
              </li>
            );
          })}
        </ul>
      );
    }
    return (<h2>This place is empty</h2>);
  }

}

AllAnnotations.propTypes = {
  isFetchingAnnotations: PropTypes.bool.isRequired,
  annotations: PropTypes.array.isRequired,
  userInfo: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { isFetchingAnnotations, annotations, userInfo } = state
  return {
    isFetchingAnnotations,
    annotations,
    userInfo
  }
}

export default connect(mapStateToProps)(AllAnnotations)
