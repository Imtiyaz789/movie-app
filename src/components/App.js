import React from "react";
import MovieCard from "./MovieCard";
import Navbar from "./Navbar";
import {data} from '../data';
import { addMovies, setShowFavourite } from "../actions";
import {StoreContext} from '../index';

class  App extends React.Component {
  componentDidMount(){
    const {store} = this.props;
    store.subscribe(()=> {
      console.log('updated');
      this.forceUpdate();
    })
    // make api call
    // dipatch action here
    store.dispatch(addMovies(data));
  }
  isMovieFavourite = (movie) => {
    const {movies} = this.props.store.getState();
    const index = movies.favourites.indexOf(movie);

    if(index !== -1){
      // found favourite movies
      return true;
    }
    return false;
  }
  onChangeTab = (val) => {
    this.props.store.dispatch(setShowFavourite(val));
    console.log(val);
  }
  render (){
    const {movies, search} = this.props.store.getState();
    const {list, favourites, showFavourites} = movies;
    console.log("Render Again", this.props.store.getState());

    const displayMovies = showFavourites ? favourites : list;
    return (
      <div className="App">
        <Navbar search={search}/>
      
        <div className="main">
          <div className="tabs">
            <div className={`tab ${showFavourites ? '' : 'active-tabs'}`} onClick={()=> this.onChangeTab(false)} >Movies</div>
            <div className={`tab ${showFavourites ? 'active-tabs' : ''}`} onClick={()=> this.onChangeTab(true)} >Favourites</div>
          </div>
          <div className="list">
            {displayMovies.map((movie, index) => (
              <MovieCard 
                movie={movie} 
                key={`movies-${index}`} 
                dispatch={this.props.store.dispatch} 
                isFavourite ={this.isMovieFavourite(movie)} 
              />
            ))}
          </div>
          {displayMovies.length === 0 ? <div className="no-movies">No Movies To Display</div> : null}
        </div>
      </div>
    );
  }
}
// class AppWrapper extends React.Component{
//   render(){
//     return(
//       <StoreContext.Consumer>
//         {(store) => <App store={store}/>}
//       </StoreContext.Consumer>
//     )
//   }
// }

function callback(state) {
  return{
    movies : state.movies,
    search : state.search,
  } 
}
const connectedAppComponent = connect(callback)(App);
export default connectedAppComponent;
