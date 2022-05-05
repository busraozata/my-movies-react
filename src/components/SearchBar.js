import React from "react";
import { Link } from 'react-router-dom';

class SearchBar extends React.Component {
    /* state = {
        searchQuery: ""
    } */

    handleFormSubmit = (event) => {
        event.preventDefault();
    }
    render() {
        return (
            <form onSubmit={this.handleFormSubmit}>
                <div className="form-row mb-5">
                    <div className="row w-100">
                        <div className="col-lg-10">
                            <input
                                /* (event) => this.setState({ searchQuery: event.target.value }) */
                                onChange={this.props.searchMovieProp}
                                type='text' className="form-control" placeholder="search a movie"
                           /*  value={this.state.searchQuery} */ />
                        </div>
                        <div className="col-lg-2"  style={{ textAlign:'end' }}>
                            <Link
                                type="button"
                                className="btn btn-md btn-danger"
                                to="/add"
                                >Add Movie
                            </Link>
                        </div>
                    </div>
                </div>
            </form>
        )
    }
}

export default SearchBar;