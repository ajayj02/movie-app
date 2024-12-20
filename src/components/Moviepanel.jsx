import { useEffect, useState } from "react";
import "../index.css";
import { FaSearch } from "react-icons/fa";
import { API_CONFIG } from "../constants";
import Card from "./Card";

const { API_KEY, URL } = API_CONFIG;

function Moviepanel() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [value, setValue] = useState("");
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const fetchData = async () => {
        try {
          setLoading(true);
          const response = await axios.get(
            URL,
            {
                headers: {
                  accept: 'application/json',
                    Authorization: API_KEY
                }
            }
          )
          if (response.status !== 200) {
            throw new Error("Error Occurred");
          }
          setData([...data, ...response.data.results, ...response.data.results]);
        } catch (e) {
          setError("Error occurred", e);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
  },[])

  console.log(data)

  return (
    <div>
      <h1 className="headline">Movie Time</h1>
      <div className="searchbar">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search here..."
        />
        <button onClick={() => setSearchValue(value)}>
          <FaSearch />
        </button>
      </div>
      <h2>{searchValue}</h2>

      <div className="movie-pane">
         {
          data.map((movie) => {
             
          })
         }
      </div>
    </div>
  );
}

export default Moviepanel;
