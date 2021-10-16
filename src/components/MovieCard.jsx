import React, { Component } from 'react'
import { addFavourites } from '../actions';

export default class MovieCard extends Component {
    handleFavouriteClick = () =>{
        const {movie} = this.props;
        this.props.dispatch(addFavourites(movie))
    }
    render() {
        const {movie} = this.props;
        return (
            <div className="movie-card">
                <div className="left">
                    <img alt="Movie images" src={movie.Poster}/>
                </div>
                <div className="right">
                    <div className="title">{movie.Title}</div>
                    <div className="plot">{movie.Plot}</div>
                    <div className="footer">
                        <div className="rating">{movie.imdbRating}</div>
                        <button className="favourite-btn" onClick={this.handleFavouriteClick}>Favourite</button>
                    </div>
                </div>
            </div>
        )
    }
}
