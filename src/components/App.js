import React from "react";
import SearchBar from './SearchBar';
import MovieList from './MovieList';
import axios from "axios";
import AddMovie from "./AddMovie";
import { BrowserRouter as Router, Route, Link, Routes, BrowserRouter } from 'react-router-dom';

require('dotenv').config()

console.log(process.env.REACT_APP_API_KEY);
class App extends React.Component {

    state = {
        movies: [],
        searchQuery: ""
    }

    //AXIOS
    async componentDidMount() {

        const response = await axios.get("http://localhost:3000/movies");
        console.log(response);
        this.setState({ movies: response.data })
    }

    //AXIOS

    deleteMovie = async (movie) => {

        axios.delete(`http://localhost:3000/movies/${movie.id}`)
        /*  axios.post(` https://api.themoviedb.org/3/list/8200984/remove_item?media_id=${movie.id}&api_key=${process.env.REACT_APP_API_KEY}&session_id=${process.env.REACT_APP_SESSION_ID}`) */


        const newMovieList = this.state.movies.filter(
            m => m.id !== movie.id
        );

        this.setState(state => ({
            //Var olan state'i güncelliyoruz
            movies: newMovieList
        }));
    }


    searchMovie = (event) => {
        //console.log(event.target.value);
        this.setState({ searchQuery: event.target.value })
    }

    addMovie = async (movie) => {
        await axios.post(`http://localhost:3000/movies/`, movie)
        this.setState(state => ({
            movies: state.movies.concat([movie])
        }))
    }

    render() {

        let filteredMovies = this.state.movies.filter(
            (movie) => {
                return movie.name.toLocaleLowerCase().indexOf(this.state.searchQuery.toLocaleLowerCase()) !== -1
            }
        )

        return (
            <div className="container">
                <Routes>
                    <Route path="/" element={
                        <React.Fragment>
                            <div className="row">
                                <div className="col-lg-12">
                                    <SearchBar searchMovieProp={this.searchMovie} />
                                </div>
                            </div>


                            <MovieList
                                movies={filteredMovies}
                                deleteMovieProp={this.deleteMovie}
                            />

                        </React.Fragment>
                    }
                    />
                    <Route path="/add" element={

                        <AddMovie onAddMovie={(movie) => { this.addMovie(movie) }} />

                    } >
                    </Route>
                </Routes>
            </div>

        );
    }
}

export default App;