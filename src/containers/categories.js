import React,{ Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchData } from '../actions/index.js';
import { favoriteData } from '../actions/get-favorites.js';

class Categories extends Component {
  constructor(props) {
    super(props);

    let movies = new Array();
    let added = new Array();
    localStorage.setItem('movies', movies);
    localStorage.setItem('added', added);

    this.onClickHandle = this.onClickHandle.bind(this);
  }

  componentWillMount(){
    this.props.fetchData('popular');
  }

  onClickHandle(e){
    if(e.target.id !== 'favorites')
      this.props.fetchData(e.target.id);
    else
      this.props.favoriteData();
    Array.from(e.target.parentNode.childNodes).map((li)=>{
        if(li.classList.contains('selected-category')) {
          li.classList.remove('selected-category');
        }
      });
    e.target.classList.add('selected-category');
  }

  render () {
    return (
      <div>
        <ul className="categories">
          <li id="popular" className="category-item selected-category" onClick={this.onClickHandle}>Popular</li>
          <li id="top_rated" className="category-item" onClick={this.onClickHandle}>Top Rated</li>
          <li id="now_playing" className="category-item" onClick={this.onClickHandle}>Now Playing</li>
          <li id="upcoming" className="category-item" onClick={this.onClickHandle}>Up Coming</li>
          <li id="favorites" className="category-item" onClick={this.onClickHandle}>My Favorites</li>
          <li id="search" className="category-item search-item" onClick={this.onClickHandle}>My Favorites</li>
        </ul>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators( { fetchData, favoriteData }, dispatch);
}

export default connect(null, mapDispatchToProps)(Categories);
