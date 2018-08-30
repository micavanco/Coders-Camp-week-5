import React, { Component } from 'react';
import { connect } from 'react-redux';
import MoviePopUp from './movie-pop-ups';

class MovieList extends Component {
  constructor(props)
  {
    super(props);

    this.state = { currentElement: null};
  }


  movieItems() {
    if(this.props.movies){
      return this.props.movies.map((movie) => {
        return <li className="movie-list-item" key={movie.id} onMouseEnter={this.onHover.bind(this)} onMouseLeave={this.onLeave.bind(this)}>
          {<MoviePopUp movie={movie} />}
          {<img className="poster" src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}/>}
          </li>;
      });
    }
}

onHover(e)
{
  this.state.currentElement = e.target.parentElement.firstElementChild;
  if(this.state.currentElement.className === 'movie-pop-ups')
    this.state.currentElement.style.display = 'block';
  else
    this.state.currentElement = null;
}

onLeave(e)
{
  this.state.currentElement.style.display = 'none';
}

  render() {
    return (
      <div>
        <ul className="list-container">
          {this.movieItems()}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    movies: state.movies
  };
}

export default connect(mapStateToProps)(MovieList);



