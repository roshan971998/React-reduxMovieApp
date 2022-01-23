//here we make sure that we dont change the existing or currrent state passed to a reducer rather 
//we always send a new state to the store
//and store will do shallow merging of previous state 
//it has and the new state passed to it

// export default function movies(state = [] , action){
//     if(action.type === 'ADD_MOVIES'){
//         return action.movies;
//     }
//     return state; //since reducer is called by store internallly so it is being returned to store only
// }
import {
    ADD_MOVIES,
    ADD_TO_FAVOURITES,
    REMOVE_FROM_FAVOURITES,
    SET_SHOW_FAVOURITES
} from '../actions';


const initialState = {
    list: [],
    favourites: [],
    showFavourites: false
}
export default function movies(state = initialState, action) {
    // if (action.type === ADD_MOVIES) {
    //     return {
    //         ...state,
    //         list:action.movies
    //     };
    // }
    // return state;

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
        default:
            return state;
    }
}    