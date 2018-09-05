import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchSearch } from '../actions/search-action.js';


class SearchBar extends Component {

  constructor(props) {
    super(props);

    this.state = { text: ''};
    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }
  onInputChange(e) {
    this.setState({text: e.target.value});

  }

  onFormSubmit(e) {
    e.preventDefault();

    this.props.fetchSearch(this.state.text);
  }

  render() {
    return (
      <div className="navbar" >
        <h2>React Movie App</h2>
        <input
          type="text"
          className="from-control search-bar"
          placeholder="Find a movie"
          value={this.state.input}
          onChange={this.onInputChange.bind(this)}
          onBlur={this.onFormSubmit}
        />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({fetchSearch}, dispatch);
}

export default connect(null, mapDispatchToProps)(SearchBar);
