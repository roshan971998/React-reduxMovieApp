import React from 'react';

import { data } from '../data';
import Navbar from './Navbar';
import MovieCard from './MovieCard';
import { addMovies, setShowFavourites } from '../actions'

class App extends React.Component {
  componentDidMount() {
    //make API call here and dispatch action
    const { store } = this.props;

    store.subscribe(() => {//we can subscribe to the changes happening to state(stored in store) and this call back function
      console.log('updated');//inside the subscribe method is called everytime we dispatch sth to store because 
      // that will result in state change as store call the reducer internally with object passed in dispatch
      this.forceUpdate(); //this line will update our app(means render is called due to this line) as we do with setState()    function
    })

    // store.dispatch({
    //   type: 'ADD_MOVIES',
    //   movies: data
    // })

    store.dispatch(addMovies(data));//on calling this dispatch callback inside the subscribe is called

    console.log(store.getState());
  }
  isMoviefavourite = (movie) => {
    const { favourites } = this.props.store.getState()
    const index = favourites.indexOf(movie);
    if (index !== -1) return true;
    return false;
  }

  onChangeTab = (val) => {
    this.props.store.dispatch(setShowFavourites(val))
  }

  render() {
    const { list, favourites, showFavourites } = this.props.store.getState();//{list:[],favourites:[],showFavourites:boolean}
    console.log(this.props.store.getState());

    const displayMovies = showFavourites ? favourites : list;
    return (
      <div className="App">
        < Navbar />
        <div className='main'>
          <div className='tabs'>
            <div className={`tab ${showFavourites ? '' : 'active-tabs'}`} onClick={() => this.onChangeTab(false)}>Movies</div>
            <div className={`tab ${showFavourites ? 'active-tabs' : ''}`} onClick={() => this.onChangeTab(true)}>Favourites</div>
          </div>

          <div className='list'>
            {displayMovies.map((movie, index) => {
              return <MovieCard
                movie={movie}
                key={`movies-${index}`}
                dispatch={this.props.store.dispatch}
                isFavourite={this.isMoviefavourite(movie)}
              />
            })}
          </div>
          {displayMovies.length === 0 ?<div className='no-movies'>No movies to display!</div>:null}
        </div>
      </div>
    );
  }
}

export default App;
