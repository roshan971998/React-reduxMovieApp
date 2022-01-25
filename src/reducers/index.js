//here we make sure that we dont change the existing or currrent state passed to a reducer rather 
//we always send a new state to the store
//and store will do shallow merging of previous state 
//it has and the new state passed to it

// export default function movies(state = [] , action){
//     if(action.type === 'ADD_MOVIES'){
//         return action.movies; //here we are passing new state( action.movies ) to store
//     }
//     return state; //since reducer is called by store internallly so it is being returned to store only
// }
import {
    ADD_MOVIES,
    ADD_TO_FAVOURITES,
    REMOVE_FROM_FAVOURITES,
    SET_SHOW_FAVOURITES,
    ADD_MOVIE_TO_LIST,
    ADD_SEARCH_RESULT
} from '../actions';

import { combineReducers } from 'redux';

//Movie reducer
const initialMovieState = {
    list: [],
    favourites: [],
    showFavourites: false
};

export function movies(state = initialMovieState, action) {
    //console.log('MOVIE REDUCER');
    switch (action.type) {
        case ADD_MOVIES:
            return {
                ...state,
                list: action.movies
            };
        case ADD_TO_FAVOURITES:
            return {
                ...state,
                favourites: [...state.favourites, action.movie]//it means the movie we will add to favourit will be last in list
                //[action.movie,...state.favourites]//in this case the movie we will select to favourite will be displayed first in list
            };
        case REMOVE_FROM_FAVOURITES:
            const filteredArray = state.favourites.filter(
                movie => movie.Title !== action.movie.Title
            )
            return {
                ...state,
                favourites: filteredArray
            };
        case SET_SHOW_FAVOURITES:
            return {
                ...state,
                showFavourites: action.val
            }
        case ADD_MOVIE_TO_LIST:
            return {
                ...state,
                list: [action.movie, ...state.list],
            };
        default:
            return state;
    }
}


//Search reducer
const initialSearchState = {
    results: [],
    showSearchResults: false
}
export function search(state = initialSearchState, action) {
    //console.log('SEARCH REDUCER');
    switch (action.type) {
        case ADD_SEARCH_RESULT:
            return {
                ...state,
                results: action.movies,
                showSearchResults: true,
            };
        case ADD_MOVIE_TO_LIST:
            return {
                ...state,
                showSearchResults: false,
            };
        default:
            return state;
    }
}


//Root reducer 
// const initialRootState = {
//     movies:initialMovieState,
//     search:initialSearchState
// }


// this is internallly how  combinedReducer is implemented
// export default function rootReducer(state = initialRootState, action) { //now this root reducer is called every time dispatch to store isa called
//     return {
//         movies: movies(state.movies, action),
//         search: search(state.search, action)
//     }
// }

//now for every dispatch action both the reducer are callled first  movie reducer then search reducer
//and thats why  when we search a movie in navbar search option and then movie appears by API call through fetch() and 
//when we click add to movies buttton then first  movie reducer then search reducer is called with same action type 
//ADD_MOVIE_TO_LIST
export default combineReducers({
    movies: movies,//left side shows which properties we want on our store and 
    search: search //right sides are reference of which reducer to be used for that property
})
