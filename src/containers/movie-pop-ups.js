import React,{ Component } from 'react';

class MoviePopUp extends Component
{
  constructor(props)
  {
    super(props);

  }

  render()
  {
    let button = '';
    if(localStorage.getItem('added').search(this.props.movie.id) === -1)
      button = <div className="fav-container">
        <div className="add-favorites" onMouseEnter={this.onHover.bind(this)} onMouseLeave={this.onLeave} onClick={this.Click.bind(this)}></div><h1 className="add-fav">Add to favorites</h1>
      </div>;
    else
      button = <div className="fav-container">
        <div className="remove-favorites" onMouseEnter={this.onHover.bind(this)} onMouseLeave={this.onLeave} onClick={this.rmClick.bind(this)}></div><h1 className="add-fav">Remove</h1>
      </div>;

    return(
      <div className="movie-pop-ups" onClick={this.onWindowClick.bind(this)}>
        <h1 onClick={this.onWindowClick.bind(this)}>{ this.props.movie.original_title}</h1>
        <div className="ratings" onClick={this.onWindowClick.bind(this)}>
          <p onClick={this.onWindowClick.bind(this)}>Rating:   <span className="rateNumber" onClick={this.onWindowClick.bind(this)}>{ this.props.movie.vote_average}</span></p>
          <div className="star" style={{width: this.props.movie.vote_average*15}} onClick={this.onWindowClick.bind(this)}></div>
        </div>
        <p onClick={this.onWindowClick.bind(this)}>{ this.props.movie.overview }</p>
        <div className="hiddenId"><h2>{ this.props.movie.id }</h2></div>
        {button}
      </div>
      );
  }

  onHover(e)
  {
    const item = e.target.nextElementSibling;
    item.style.display = 'inline';
    item.classList.add('fade-in');

    clearTimeout(function () {
      item.classList.remove('fade-in');
    });
    setTimeout(function () {
      item.classList.remove('fade-in');
    }, 2000);
  }

  onLeave(e)
  {
    if(e.target.nextElementSibling)
      e.target.nextElementSibling.style.display='none';
  }

  Click(e)
  {
    if(e.target.className === 'add-favorites')
    {
      e.target.classList.remove('add-favorites');
      e.target.classList.add('remove-favorites');
      e.target.nextElementSibling.innerText = 'Remove';
      let array = localStorage.getItem('movies');
      const array2 = [];
      localStorage.getItem('added').split(',').map(i => array2.push(i));

      if(localStorage.getItem('movies'))
        array=array+','+JSON.stringify(this.props.movie);
      else
        array=JSON.stringify(this.props.movie);

      if(array2[0] === '')
        array2[0]=JSON.stringify(this.props.movie.id);
      else
        array2.push(JSON.stringify(this.props.movie.id));

      localStorage.setItem('movies', array);
      localStorage.setItem('added', array2);
    }else
    {
      e.target.classList.add('add-favorites');
      e.target.classList.remove('remove-favorites');
      e.target.nextElementSibling.innerText = 'Add to favorites';
      const elId = e.target.parentElement.previousElementSibling.innerText;

      let array = localStorage.getItem('movies');
      const array2 = [];
      localStorage.getItem('added').split(',').map(i => array2.push(i));


      const indexStr = array.search(elId);
      const indexRight = array.indexOf('}',indexStr+30)
      let indexLeft;

      if(indexStr>80)
      {
        indexLeft = array.indexOf('{',indexStr-80);
        array = array.replace(array.substring(indexLeft-1,indexRight+1), '');
      }
      else
      {
        indexLeft = 0;
        array = array.replace(array.substring(indexLeft-1,indexRight+2), '');
      }

      const index = array2.indexOf(elId, 0);
      array2.splice(index, 1);

      localStorage.setItem('movies', array);
      localStorage.setItem('added', array2);

      if(document.querySelector('.selected-category').id === 'favorites')
        e.target.parentElement.parentElement.parentElement.style.display = 'none';
    }
  }

  rmClick(e)
  {
    e.target.classList.add('add-favorites');
    e.target.classList.remove('remove-favorites');
    e.target.nextElementSibling.innerText = 'Add to favorites';
    const elId = e.target.parentElement.previousElementSibling.innerText;

    let array = localStorage.getItem('movies');
    const array2 = [];
    localStorage.getItem('added').split(',').map(i => array2.push(i));


    const indexStr = array.search(elId);
    const indexRight = array.indexOf('}',indexStr+30)
    let indexLeft;

    if(indexStr>80)
    {
      indexLeft = array.indexOf('{',indexStr-80);
      array = array.replace(array.substring(indexLeft-1,indexRight+1), '');
    }
    else
    {
      indexLeft = 0;
      array = array.replace(array.substring(indexLeft-1,indexRight+2), '');
    }

    const index = array2.indexOf(elId, 0);
    array2.splice(index, 1);

    localStorage.setItem('movies', array);
    localStorage.setItem('added', array2);

    if(document.querySelector('.selected-category').id === 'favorites')
      e.target.parentElement.parentElement.parentElement.style.display = 'none';

  }

  onWindowClick()
  {
    const content = document.getElementById('description-box');
    content.innerHTML = '';
    const button = document.createElement('div');
    button.id = "arrow";
    button.addEventListener('click', function () {
      document.getElementById('description-container').style.display = "none";
    });
    document.getElementById('description-container').style.display = "block";
    const background = document.getElementById('description-background');
    background.style.background = 'url(\"https://image.tmdb.org/t/p/w300/'+this.props.movie.poster_path+'\") no-repeat';
    background.style.backgroundSize = "cover";
    content.innerHTML = "<img class=\"poster-inside\" src=\"https://image.tmdb.org/t/p/w300/"+this.props.movie.poster_path+"\"/>"+
      "<h1 class='poster-title'>"+this.props.movie.original_title+' ('+this.props.movie.release_date.substring(0,4)+')'+"</h1>" +
    "<h1 class='rateNumber-window'>"+this.props.movie.vote_average+"</h1>"+
    "<div class=\"star-window\" style=\"width: "+this.props.movie.vote_average*15+"px;\"></div>"+
    "<h2>Description:</h2>"+
    "<div class='window-p'>"+this.props.movie.overview+"</div>";
    content.appendChild(button);
  }

}



export default MoviePopUp;
