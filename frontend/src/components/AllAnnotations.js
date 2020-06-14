import React, { Component } from 'react';
import { render } from "react-dom";
import PropTypes from 'prop-types';
import { fetchAllAnnotations } from './actions';
import { connect } from 'react-redux'

class AllAnnotations extends Component {
  constructor(props) {
    super(props);
    const { dispatch } = this.props;
    dispatch(fetchAllAnnotations());
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
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { isFetchingAnnotations, annotations } = state
  return {
    isFetchingAnnotations,
    annotations
  }
}

export default connect(mapStateToProps)(AllAnnotations)
