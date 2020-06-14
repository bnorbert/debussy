import { render } from "react-dom";
import axios from 'axios';
import React, { Component } from 'react';

class ProjectAdd extends Component {
  constructor(props) {
    super(props)
    this.onChangeProjectName = this.onChangeProjectName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeCategories = this.onChangeCategories.bind(this);
    this.onChangeVisibility = this.onChangeVisibility.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      project_name: '',
      description: '',
      categories:'',
      visibility: 'public',
    }
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
      project_name: this.state.project_name,
      description: this.state.description,
      categories: this.state.categories,
      private: isprivate,
      annotations: []
    };
    console.log(obj)

    axios.post('http://localhost:8000/debussy/api/projects/', obj)
        .then(res => console.log(res));
    this.props.history.push('/frontend/');
  }

  render() {
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
                <div>
                    <input type="submit"
                      value="Add Project"/>
                </div>
            </form>)
  }
}

export default ProjectAdd;
