import React, { Component } from 'react';
import { addMovieToList, handleMovieSearch } from '../actions';
import SearchMovieCard from './SearchMovieCard';

//import { data } from '../data';
//import { StoreContext } from '..';

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: ''
        };
    }
    handleAddToMovies = (movie) => {
        this.props.dispatch(addMovieToList(movie));
    };

    handleSearchClick = () => {
        const { searchText } = this.state;
        this.props.dispatch(handleMovieSearch(searchText));
    };

    handleSearchChange = (e) => {
        this.setState({
            searchText: e.target.value,
        });
    };

    render() {
        const { results:movies , showSearchResults } = this.props.search;
        return (
            <div className="nav">
                <div className="search-container">
                    <input onChange={this.handleSearchChange} />
                    <button id ="search-btn" onClick={this.handleSearchClick}>
                        Search
                    </button>

                    {showSearchResults && 
                       movies.map((movie,index)=>{
                           return  <SearchMovieCard movie={movie} key={index} handleAddToMovies={this.handleAddToMovies}/>
                       })
                    }
                </div>
            </div>
        );
    }
}
export default Navbar;
