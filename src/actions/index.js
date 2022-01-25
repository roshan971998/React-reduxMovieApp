//action types
export const ADD_MOVIES = 'ADD_MOVIES';
export const ADD_TO_FAVOURITES = 'ADD_TO_FAVOURITES';
export const REMOVE_FROM_FAVOURITES = 'REMOVE_FROM_FAVOURITES';
export const SET_SHOW_FAVOURITES = 'SET_SHOW_FAVOURITES';
export const ADD_MOVIE_TO_LIST = 'ADD_MOVIE_TO_LIST';
export const ADD_SEARCH_RESULT = 'ADD_SEARCH_RESULT';

//action creators
export function addMovies(movies) {
    return {
        type: ADD_MOVIES,
        movies: movies
    }
}

export function addToFavourites(movie) {
    return {
        type: ADD_TO_FAVOURITES,
        movie: movie
    }
}

export function removeFromFavourites(movie) {
    return {
        type: REMOVE_FROM_FAVOURITES,
        movie: movie
    }
}

export function setShowFavourites(val) {
    return {
        type: SET_SHOW_FAVOURITES,
        val
    }
}

export function addMovieToList(movie) {
    return {
        type: ADD_MOVIE_TO_LIST,
        movie
    }
}


//since mostly action creators are synchronous and returns a particular object but here it is not synchronous
// as we are calling fetch() inside it hence simply returning will result in crash of our app
//from now on due to this handleMovieSearch() action creators we have a different type that returns function unlike regular object
//hence before sending the actions to reducers we want the redux to check first if it simply plain object then 
//send directly to reducers else if it is a function then call it with dispatch reference
//hence we need a middleware now before sending actions to reducers to work upon directly
//as middlewares are called just after a action is dispatched and before it reaches the reducer
export function handleMovieSearch(searchText) {
    //(such functions returned by another function in redux are called as thunk)
    return function (dispatch) { //since we dont have reference to dispatch here hence we are returning a function which will have dispatch reference
        const url = `https://www.omdbapi.com/?apikey=90f70127&s=${searchText}`;
        fetch(url) 
        .then(response => response.json())
        .then(movie => {
            console.log('movie=',movie.Search);
            // dispatch action to save search results in store
            dispatch(addMovieSearchResult(movie.Search));
        });
    }
}


export function addMovieSearchResult(movies) {
    return {
      type: ADD_SEARCH_RESULT,
      movies
    };
  }