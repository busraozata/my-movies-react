import React from "react";
import SearchBar from './SearchBar';
import MovieList from './MovieList';
import axios from "axios";
import AddMovie from "./AddMovie";
import { BrowserRouter as Router, Route, Link, Routes, BrowserRouter } from 'react-router-dom';

require('dotenv').config()

console.log(process.env.REACT_APP_API_KEY);
class App extends React.Component {

    state = { //nesne(object)
        /*  movies: [ //Array(proporty)
             {
                 "name": "The Matrix 3",
                 "rating": "8.1",
                 "overview": "Set in the 22nd century, The Matrix tells the story of a computer hacker who joins a group of underground insurgents fighting the vast and powerful computers who now rule the earth.",
                 "imageURL": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/dXNAPwY7VrqMAo51EKhhCJfaGb5.jpg",
                 "id": 7
             },
             {
                 "name": "The Matrix Reloaded",
                 "rating": "6.9",
                 "imageURL": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/jBegA6V243J6HUnpcOILsRvBnGb.jpg",
                 "overview": "Six months after the events depicted in The Matrix, Neo has proved to be a good omen for the free humans, as more and more humans are being freed from the matrix and brought to Zion, the one and only stronghold of the Resistance. Neo himself has discovered his superpowers including super speed, ability to see the codes of the things inside the matrix and a certain degree of pre-cognition.",
                 "id": 8
             },
             {
                 "name": "Saw 3D",
                 "rating": "7.5",
                 "overview": "SAW legacy, a group of Jigsaw survivors gathers to seek the support of self-help guru and fellow survivor Bobby Dagen, a man whose own dark secrets unleash a new wave of terror.",
                 "imageURL": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/qHCZ6LjtmqWDfXXN28TlIC9OppK.jpg",
                 "id": 11
             },
             {
                 "name": "Blitz 007",
                 "rating": "11",
                 "overview": "A tough, renegade cop with a gay sidekick is dispatched to take down a serial killer who has been targeting police officers. AÇIKLAMA AÇIKLAMA",
                 "imageURL": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/qCPMjT8Ld8tvs1zs7LY2jpKlRIK.jpg",
                 "id": 12
             },
             {
                 "name": "Hostage",
                 "rating": "6.3",
                 "imageURL": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/4hne3v6jN4MlCnhSkxOW7YspJhr.jpg",
                 "overview": "When a mafia accountant is taken hostage on his beat, a police officer – wracked by guilt from a prior stint as a negotiator – must negotiate the standoff, even as his own family is held captive by the mob.",
                 "id": 13
             }
         ], */

        movies: [],
        searchQuery: ""
    }
    //FETCH
    /* 
        async componentDidMount() {
            //UI componentleri dom'da yerini aldıktan sonra hemen çalışır. HTTP isteklerini burada yaparız
            const baseURL = "http://localhost:3000/movies";
            const response = await fetch(baseURL);
             Fetch API, tıpkı Ajax gibi veri alma, veri gönderme işlemlerinde 
            kullanılan asenkron bir yapıdır. Fetch ile yapılan işlemler bize resolved, 
            rejected şeklinde yani promise yapısı ile döndüğü için fetch kullanımını daha 
            iyi anlayabilmek için promise yapısını bilmemiz gerekir. 
            console.log(response);
            const data = await response.json();
            console.log(data);
            this.setState({movies:data})
        } */

    //AXIOS
    async componentDidMount() {

        const response = await axios.get("http://localhost:3000/movies");
        console.log(response);
        this.setState({ movies: response.data })
    }

    /*  deleteMovie = (movie) => {
         const newMovieList = this.state.movies.filter(
             m => m.id !== movie.id
         );
 
         /*  this.setState ({
              movies:newMovieList
          }) 
 
         this.setState(state => ({
             //Var olan state'i güncelliyoruz
             movies: newMovieList
         }));
     } */

    //FETCH API
    /*   deleteMovie = async (movie) => {
          const baseURL = `http://localhost:3000/movies/${movie.id}`;
          await fetch(baseURL,{
              method: "DELETE"
          })
          const newMovieList = this.state.movies.filter(
              m => m.id !== movie.id
          );
  
          this.setState(state => ({
              //Var olan state'i güncelliyoruz
              movies: newMovieList
          }));
      }  */


    /*     //API
    
        async componentDidMount() {
    
            const response = await axios.get(`https://api.themoviedb.org/3/list/8200984?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
            console.log(response.data.items);
            this.setState({ movies: response.data.items })
        } */



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
                        <div>
                            <div className="row">
                                <div className="col-lg-12">
                                    <SearchBar searchMovieProp={this.searchMovie} />
                                </div>
                            </div>


                            <MovieList
                                movies={filteredMovies}
                                deleteMovieProp={this.deleteMovie}
                            />

                        </div>
                    }
                    />
                    <Route path="/add" element={<AddMovie />} />
                </Routes>
            </div>

        );
    }
}

export default App;