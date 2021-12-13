import axios from "axios";

// Function to create a request to the tmdb API
// API fetching from themoviedb
const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

// Exporting instance object.Making it available
export default instance;
