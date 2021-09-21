import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import { Link } from "react-router-dom";
import axios from 'axios';
import Badge from 'react-bootstrap/Badge';


export class MovieView extends React.Component {

  addFavorite() {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');

    axios.post(`https:my-flixdbapp.herokuapp.com/users/${username}/movies/${this.props.movie._id}`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        alert(`Added to Favorites List`)
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  render() {
    const { movie, onBackClick } = this.props;

    return (
      <div className="movie-view">
      <div className="movie-poster">
      <img src={movie.ImagePath} />
      </div>
      <div className="movie-title">
        <h1>
          <Badge bg="primary">
            <span className="value">{movie.Title}</span>
          </Badge></h1>
      </div>
      <div className="movie-description">
        <span className="value">{movie.Description}</span>
      </div>
      <div className="movie-genre">
      <Link to={`/genres/${movie.Genre.Name}`}>
      <Button variant="link">Genre: </Button>
        </Link>
        <span className="value">{movie.Genre.Name}</span>
      </div>
      <div className="movie-director">
      <Link to={`/directors/${movie.Director.Name}`}>
      <Button variant="link">Director: </Button>
        </Link>
        <span className="value">{movie.Director.Name}</span>
      </div>
      <Button variant='dark' className="fav-button" value={movie._id} onClick={(e) => this.addFavorite(e, movie)}>
         Favourite 
      </Button>
      <Button variant="dark" onClick={() => 
        { onBackClick(null); }}>Back</Button>
      </div>
  );
}
}


MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Featured: PropTypes.bool.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired
    }),
  }).isRequired
};