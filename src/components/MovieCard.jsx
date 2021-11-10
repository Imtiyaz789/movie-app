import React, { Component } from 'react'
import { addFavourite, removeFavourite } from '../actions';

export default class MovieCard extends Component {
    handleFavouriteClick = () =>{
        const {movie} = this.props;
        this.props.dispatch(addFavourite(movie))
    }
    handleUnfavouriteClick = () =>{
        const {movie} = this.props;
        this.props.dispatch(removeFavourite(movie))
    }
    render() {
        const {movie, isFavourite} = this.props;
        // console.log('movies',movie);
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
                        {
                            isFavourite
                            ?<button className="unfavourite-btn" onClick={this.handleUnfavouriteClick}>Unfavourite</button>
                            :<button className="favourite-btn" onClick={this.handleFavouriteClick}>Favourite</button>
                        }
                    </div>
                </div>
            </div>
        )
    }
}
