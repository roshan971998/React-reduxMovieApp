import React from "react";

class SearchMovieCard extends React.Component {
    render() {
        const {movie} = this.props;
        return (
            <div className="search-results">
                <div className="search-result">
                    <img src={movie.Poster} alt="search-pic" />
                    <div className="movie-info">
                        <span>{movie.Title}</span>
                        <button onClick={() => this.props.handleAddToMovies(movie)}>
                            Add to Movies
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default SearchMovieCard;