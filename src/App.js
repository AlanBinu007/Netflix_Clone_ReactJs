import React from "react";
import "./App.css";
import Row from "./Row";
import requests from "./requests";
import Banner from "./Banner";
import "./Banner.css";
import Nav from "./Nav";

function App() {
  return (
    <div className="app">
      {/* Inserting design components and fetch param from tmdb API */}
      <Nav />
      <Banner />
      <Row
        title="NETFLIX ORGINALS"
        fetchURL={requests.fetchNetflixOriginals}
        isLargeRow={true}
      />
      {/* isLargeRow made up param -> row__posterLarge */}
      <Row title="Trending Now" fetchURL={requests.fetchTrending} />
      <Row title="Top Rated" fetchURL={requests.fetchTopRated} />
      <Row title="Action Movies" fetchURL={requests.fetchActionMovies} />
      <Row title="Horror Movies" fetchURL={requests.fetchHorrorMovies} />
      <Row title="Romance Movies" fetchURL={requests.fetchRomanceMovies} />
      <Row
        title="Documentaries Movies"
        fetchURL={requests.fetchDocumentaries}
      />
    </div>
  );
}

// Exporting App function. Making it available
export default App;
