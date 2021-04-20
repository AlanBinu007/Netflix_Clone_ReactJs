import React, { useState, useEffect } from "react";
// imports DEFAULT(alias) export from axios.js
import axios from "./axios";
import "./Row.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

const base_URL = "https://image.tmdb.org/t/p/original/";

// Row component
function Row({ title, fetchURL, isLargeRow }) {
  /* Creating a movie state (short term memory) */
  const [movies, setMovies] = useState([]);
  /* Creating a trailer state (short term memory) */
  const [trailerURL, setTrailerURL] = useState("");
  //   Pulling information from tmdb API when the pages loads
  useEffect(() => {
    //   Running async call
    async function fetchData() {
      // Waiting for the promise to come back with movie results, fetchURL(outside the code block)
      const request = await axios.get(fetchURL);
      setMovies(request.data.results);
      return request;
    }
    // if [empty], run once when the row loads, and dont run again
    fetchData();
  }, [fetchURL]);
  //   console.log(movies);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  //   When user clicks on the movie picture
  const handleClick = (movie) => {
    //   If trailer is found clear the url
    if (trailerURL) {
      setTrailerURL("");
    } else {
      // Search for movie trailer full url
      movieTrailer(movie?.name || "")
        .then((url) => {
          // https://www.youtube.com/watch?v=aSØDÆømlsdæ
          const urlParams = new URLSearchParams(new URL(url).search); // urlParams gives us everthing after the ?
          setTrailerURL(urlParams.get("v")); //urlParams gives us everything after v=
          // Displays error message if unable to find url
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div className="row">
      <h2>{title}</h2>
      {/* Container for movie rows */}
      <div className="row__posters">
        {/* several row poster */}
        {/* Looping through movies array API */}
        {movies.map((movie) => (
          //   returns movie images in new array
          <img
            //   "key" loads movie row faster knowing the movie id
            key={movie.id}
            // Setting up onClick event for trailer
            onClick={() => handleClick(movie)}
            // All poster same size (row__poster) except if you are larger row, then use
            // isLargeRow
            className={`row__poster ${isLargeRow && "row__posterLarge"}`}
            // Loads poster images from base url
            src={`${base_URL}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
        {/* Contain -> posters */}
      </div>
      {/* Embedding youtube movie trailers to show */}
      {trailerURL && <YouTube videoId={trailerURL} opts={opts} />}
    </div>
  );
}

// Exporting Row function. Making it available
export default Row;
