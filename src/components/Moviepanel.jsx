import { useEffect, useState } from "react";
import "../index.css";
import { FaSearch } from "react-icons/fa";
import { API_CONFIG } from "../constants";
import Card from "./Card";
import axios from "axios";

const { API_KEY, URL } = API_CONFIG;

function Moviepanel() {
  const [data, setData] = useState([]);
  const [value, setValue] = useState("");
  const [sortBy, setSortBy] = useState("popularity.desc");
  const [genres, setGenres] = useState([]);
  const [movies, setMovies] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");

  useEffect(() => {
    const getGenre = async () => {
      const response = await axios.get(
        "https://api.themoviedb.org/3/genre/movie/list",
        {
          headers: {
            Authorization: API_KEY,
          },
        }
      );

      setGenres(response.data.genres);
    };
    getGenre();
  }, []);
  console.log(selectedGenre)
  useEffect(() => {
    const fetchMovies = async () => {
      const response = await axios.get(
        "https://api.themoviedb.org/3/discover/movie/",
        {
          headers: {
            Authorization: API_KEY,
          },
          params: {
            sort_by: sortBy,
            page: 1,
            with_genres: selectedGenre,
            query: data
          },
        }
      );

      setMovies(response.data.results);
    };
    fetchMovies();
  }, [sortBy, selectedGenre, data]);

  const handleSearch = async () => {
    const response = await axios.get(URL, {
      headers: {
        Authorization: API_KEY,
      },
      params: {
        query: value,
      },
    });

    setData(response.data.results);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleGenreChange = (e) => {
    setSelectedGenre(e.target.value);
  };

  return (
    <div>
      <div className="header">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h1 className="headline">Movie Time</h1>
          <div className="searchbar">
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Search here..."
            />
            <button onClick={handleSearch}>
              <FaSearch />
            </button>
          </div>
        </div>

        <div className="filters">
          <label htmlFor="sort-by">Sort By:</label>
          <select name="sort-by" id="sort-by" onChange={handleSortChange}>
            <option value="popularity.desc">Popularity Descending</option>
            <option value="popularity.asc">Popularity Ascending</option>
            <option value="vote_average.desc">Rating Descending</option>
            <option value="vote_average.asc">Rating Ascending</option>
            <option value="primary_release_date.desc">
              Release Date Descending
            </option>
            <option value="primary_release_date.asc">
              Release Date Ascending
            </option>
          </select>
          <label htmlFor="sort-by">Genre:</label>
          <select name="sort-by" id="sort-by" onChange={handleGenreChange}>
            <option value="">All Genres</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.name}>
                {genre.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="now-movie-pane">
        <div className="now-playing">
          {data.map((movie) => (
            <div key={movie.id}>
              <Card
                poster_path={movie.poster_path}
                title={movie.title}
                release_date={movie.release_date}
                original_language={movie.original_language}
                vote_average={movie.vote_average}
                overview={movie.overview}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Moviepanel;
