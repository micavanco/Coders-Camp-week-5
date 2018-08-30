import React,{ Component } from 'react';

const MoviePopUp = (props) =>
{
  let starsStyle = {width: props.movie.vote_average*15};

    return (
      <div className="movie-pop-ups">
        <h1>{ props.movie.original_title}</h1>
        <div className="ratings">
          <p>Rating:   <span className="rateNumber">{ props.movie.vote_average}</span></p>
          <div className="star" style={starsStyle}></div>
        </div>
        <p>{ props.movie.overview }</p>
      </div>
    );

}

export default MoviePopUp;
