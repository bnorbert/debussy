import { render } from "react-dom";
import axios from 'axios';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class ProjectDetail extends Component {
  constructor(props) {
    super(props)
    this.onChangeProjectName = this.onChangeProjectName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeCategories = this.onChangeCategories.bind(this);
    this.onChangeVisibility = this.onChangeVisibility.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      current_user_id: this.props.user_id,
      project_id: this.props.match.params.id,
      project_user_id: null,
      project_name: '',
      description: '',
      categories:'',
      visibility: 'public',
      annotation_ids: []
    }
  }

  componentDidMount() {
    axios.get("http://localhost:8000/debussy/api/projects/" + this.state.project_id)
      .then(response => response.data)
      .then(project_details => this.setState({
        project_name: project_details.name,
        project_user_id: parseInt(project_details.owner),
        description: project_details.description,
        categories: project_details.categories,
        visibility: project_details.private ? 'private' : 'public',
        annotation_ids: project_details.annotations
      }))
  }

  onChangeProjectName(e) {
    this.setState({
      project_name: e.target.value
    });
  }
  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    })
  }
  onChangeCategories(e) {
    this.setState({
      categories: e.target.value
    })
  }
  onChangeVisibility(e) {
    this.setState({
      visibility: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();
    const { visibility } = this.state
    let isprivate = false;
    if (visibility == "public") {
      isprivate = false;
    }
    else {
      isprivate = true;
    }
    const obj = {
      name: this.state.project_name,
      owner: this.state.current_user_id,
      description: this.state.description,
      categories: this.state.categories,
      private: isprivate,
      annotations: this.state.annotation_ids
    };
    console.log("saving")
    console.log(obj)

    axios.patch('http://localhost:8000/debussy/api/projects/1/', obj)
        .then(response => console.log(response));
    //this.props.history.push('/frontend/');
  }

  render() {

    let submitButton;
    if (this.state.project_user_id == this.state.current_user_id)
      submitButton = (
          <div>
            <input type="submit" value="Save"/>
          </div>
      );
    return (<form onSubmit={this.onSubmit}>
                <div>
                    <label>Project Name:  </label>
                    <input
                      type="text"
                      value={this.state.project_name}
                      onChange={this.onChangeProjectName}
                      />
                </div>
                <div className="form-group">
                    <label>Description: </label>
                    <input type="text"
                      value={this.state.description}
                      onChange={this.onChangeDescription}
                      />
                </div>
                <div >
                    <label>Categories:</label>
                    <input type="text"
                      value={this.state.categories}
                      onChange={this.onChangeCategories}
                      />
                </div>
                <div>
                  <label>Visibility:</label>
                  <select onChange={this.onChangeVisibility} value={this.state.visibility}>
                    <option value="public">Public</option>
                    <option value="private">Private</option>
                  </select>
                </div>
                {submitButton}
            </form>)
  }
}

ProjectDetail.propTypes = {
  user_id: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { userInfo } = state;
  return {
    user_id: userInfo.id
  }
}

export default connect(mapStateToProps)(ProjectDetail);
