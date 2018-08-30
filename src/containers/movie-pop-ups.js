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
    if(localStorage.getItem('added').search(this.props.movie.id) == -1)
      button = <div className="fav-container">
        <div className="add-favorites" onMouseEnter={this.onHover.bind(this)} onMouseLeave={this.onLeave} onClick={this.Click.bind(this)}></div><h1 className="add-fav">Add to favorites</h1>
      </div>;
    else
      button = <div className="fav-container">
        <div className="remove-favorites" onMouseEnter={this.onHover.bind(this)} onMouseLeave={this.onLeave} onClick={this.rmClick.bind(this)}></div><h1 className="add-fav">Remove</h1>
      </div>;

    return (
        <div className="movie-pop-ups" >
          <h1>{ this.props.movie.original_title}</h1>
          <div className="ratings">
            <p>Rating:   <span className="rateNumber">{ this.props.movie.vote_average}</span></p>
            <div className="star" style={{width: this.props.movie.vote_average*15}}></div>
          </div>
          <p>{ this.props.movie.overview }</p>
          <div className='hideId'>{this.props.movie.id}</div>
          {button}
    </div>
    );
  }

  onHover(e)
  {
    const item = e.target.nextElementSibling;
    item.style.display = 'inline';
    item.classList.add('fade-in');

    clearTimeout(this.timer(item));
    setTimeout(this.timer(item), 2000);
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

      let array = localStorage.getItem('movies');
      const array2 = [];
      const elTitle = e.target.parentElement.previousElementSibling;
      localStorage.getItem('added').split(',').map(i => array2.push(i));

      console.log(elTitle.innerText);
      const indexStr = array.search(elTitle.innerText);
      console.log(indexStr);
      let indexLeft;
      if(indexStr>80)
        indexLeft = array.indexOf('{',indexStr-80);
      else
        indexLeft = 0;
      const indexRight = array.indexOf('}',indexStr+30)

      const index = array2.indexOf(elTitle.innerText, 0);
      array2.splice(index, 1);
      console.log(array.substring(indexLeft-1,indexRight+1));
      array = array.replace(array.substring(indexLeft-1,indexRight+1), '');

      localStorage.setItem('movies', array);
      localStorage.setItem('added', array2);
    }
  }

  rmClick(e)
  {
    e.target.classList.add('add-favorites');
    e.target.classList.remove('remove-favorites');
    e.target.nextElementSibling.innerText = 'Add to favorites';

    let array = localStorage.getItem('movies');
    const array2 = [];
    const elTitle = e.target.parentElement.previousElementSibling;
    localStorage.getItem('added').split(',').map(i => array2.push(i));

    console.log(elTitle.innerText);
    const indexStr = array.search(elTitle.innerText);
    console.log(indexStr);
    let indexLeft;
    if(indexStr>80)
      indexLeft = array.indexOf('{',indexStr-80);
    else
      indexLeft = 0;
    const indexRight = array.indexOf('}',indexStr+30)

    const index = array2.indexOf(elTitle.innerText, 0);
    array2.splice(index, 1);
    console.log(array.substring(indexLeft-1,indexRight+1));
    array = array.replace(array.substring(indexLeft-1,indexRight+1), '');

    localStorage.setItem('movies', array);
    localStorage.setItem('added', array2);

  }

  timer(item)
  {
    item.classList.remove('fade-in');
  }


}



export default MoviePopUp;
