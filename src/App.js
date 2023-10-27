import React, { useEffect, useState } from "react";

import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import MovieList from './components/MovieList';
import Movie from './components/Movie';

import MovieHeader from './components/MovieHeader';

import FavoriteMovieList from './components/FavoriteMovieList';

import axios from 'axios';
import EditMovieForm from "./components/EditMovieForm";
import AddMovieForm from "./components/AddMovieForm";
import DeleteMovieModal from "./components/DeleteMovieModal";

const App = (props) => {
  const [movies, setMovies] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:9000/api/movies')
      .then(res => {
        setMovies(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const deleteMovie = (id) => {
      return <DeleteMovieModal/>;
      // axios.delete(`http://localhost:9000/api/movies/${id}`)
      //   .then (res => {
      //     console.log(res);
      //     setMovies(res.data);
      //     setFavoriteMovies(favoriteMovies.filter(item => item.id !== id))
      //     navigate('/movies');
      //   })
      //   .catch (error => {
      //     console.log(error)
      //   })
  }

  const addToFavorites = (movie) => {
    setFavoriteMovies([
      ...favoriteMovies,
      movie
    ])
  }

  return (
    <div>
      <nav className="navbar navbar-dark bg-dark">
        <span className="navbar-brand" > HTTP / CRUD Module Project</span>
      </nav>

      <div className="container">
        <MovieHeader />
        <div className="row ">
          <FavoriteMovieList favoriteMovies={favoriteMovies} />

          <Routes>
            <Route path="movies/add" element={<AddMovieForm setMovies={setMovies} movies={movies}/>}/>

            <Route path="movies/edit/:id" element={<EditMovieForm setMovies={setMovies} movies={movies}/>}/>

            <Route path="movies/:id" element={<Movie addToFavorites={addToFavorites} deleteMovie={deleteMovie}/>} />

            <Route path="movies" element={<MovieList movies={movies} />} />

            <Route path="/" element={<Navigate to="/movies" />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};


export default App;
