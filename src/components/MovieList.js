import React from "react";

const MovieList = (props) => {

    /*     function handleClick(e){
           //console.log("Button Clicked");
           //console.log(e);
        }  */

        return (
            <div className="row">

                {props.movies.map((movie) => (
                    <div className="col-lg-4" key={movie.id}>
                        <div className="card mb-4 shadow-sm">
                            <img src={movie.imageURL} /* {`https://www.themoviedb.org/t/p/w440_and_h660_face/${movie.poster_path}`} */ className="card-img-top img-fluid" alt="Sample Movie" />
                            <div className="card-body">
                                <h5 className="Card Title">{movie.name}</h5>
                                <p>{movie.overview}</p>
                                <div className="d-flex justify-content-between align-items-center">
                                    <button type="button" onClick={(event) => props.deleteMovieProp(movie)} className="btn btn-md btn-outline-danger">Delete</button>
                                    <h2>
                                        <span className="badge bg-info">{movie.rating}</span>
                                    </h2>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

            </div>
        )
    
}

export default MovieList;