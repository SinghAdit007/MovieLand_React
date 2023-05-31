import {useState, useEffect} from 'react';
import MovieCard from './MovieCard';
import './App.css';
import SearchIcon from './search.svg';

// require('dotenv').config()  
// import config from './config.json';

 
// const apiKey = config.REACT_APP_API_KEY;



const App = () => { 

  // console.log(process.env.REACT_APP_API_KEY)
  const API_URL = `http://www.omdbapi.com?apiKey=${process.env.REACT_APP_API_KEY}`;
  const [movies, setMovies] = useState([])
  const [searchTerm, setSearchTerm] = useState('');
  const searchMovies = async (title) => {
     const response = await fetch(`${API_URL}&s=${title}`);
     const data = await response.json();

     setMovies(data.Search);
  }

  useEffect(() => {
    searchMovies('movie');
  }, []);

  return (
    <div className="app">
      <h1>MovieLand</h1>

      <div className="search">
        <input
            placeholder="Search for movies"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value) }
            />
            <img src={SearchIcon}
            alt="search"
            onClick={()=> searchMovies(searchTerm)}
            />
      </div>

      {
        movies?.length > 0
        ?(
          <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
         </div>
        ) : (
          <div className="empty">
            <h2>No movies found</h2>
          </div>
        )
      }
     </div>
  );
}

export default App;