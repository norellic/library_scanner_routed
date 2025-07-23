import { useEffect, useState } from 'react'
import BookDetail from './components/bookDetail';
import './App.css'

function App() {
  const [list, setList] = useState(null);
  const [filteredResults, setFilteredResults] = useState([])
  const [searchInput, setSearchInput] = useState("")
  const [minYear, setMinYear] = useState(1950);
  const [filterEnglish, setFilterEnglish] = useState(false);
  
  const query = `https://openlibrary.org/search.json?q=kay+oneill`;

  useEffect(() => {

    const fetchallData = async (query) => {
      try {
        const response = await fetch(query);
        const json = await response.json(); 
        setList(json);
        //console.log(json);
      } catch (error) {
        console.error("Error fetching from API:", error);
    }}

    fetchallData(query)
  }, []);

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
  
    if (searchValue !== "" && list?.docs) {
      const searchLower = searchValue.toLowerCase();
      const filteredData = list.docs.filter((book) => {
        // Check if the book title includes the search term
        const titleMatch = book.title?.toLowerCase().includes(searchLower);

        // Check if any author in the author_name array includes the search term
        const authorMatch = book.author_name?.some((author) =>
            author.toLowerCase().includes(searchLower)
        );

        return titleMatch || authorMatch;
    });
      setFilteredResults(filteredData);
    } else {
      // show full list if input is empty
      setFilteredResults(list?.docs || []);
    }
  };

  const booksToDisplay = (searchInput.length > 0 ? filteredResults : list?.docs || [])
  .filter((book) =>
    book.first_publish_year && book.first_publish_year >= minYear &&
    (!filterEnglish || (book.language && book.language.includes("eng")))
  );

  return (
    <>
      <div>

        <h1>Library Scanner:</h1>

        <div class="summary_stats_container">

        <div className="summary_stats_item">
        {list?.num_found !== undefined && (
        <p>Number of results found: {booksToDisplay.length}</p>
        )}
        </div>

        <div className="summary_stats_item">
        {list?.num_found !== undefined && (
          <p>
            Average publication year: {
              Math.round(
                booksToDisplay
                  .filter(book => typeof book.first_publish_year === 'number')
                  .reduce((sum, book) => sum + book.first_publish_year, 0) /
                booksToDisplay.filter(book => typeof book.first_publish_year === 'number').length
              )
            }
          </p>
        )}
        </div>

        <div className="summary_stats_item">
        {list?.num_found !== undefined && (
          <p>Books with covers: {
            booksToDisplay.filter(book => book.cover_i !== undefined).length
          }</p>
        )}
        </div>

        </div>

        <br></br>

        <div class="search_container">

        <div class="search_container_item">

        <label>
          Min Year: {minYear}
          <input
            type="range"
            name="minyear"
            min="1950"
            max="2025"
            step="5"
            value={minYear}
            onChange={(e) => setMinYear(Number(e.target.value))}
          />
        </label>

        </div>

        <div class="search_container_item">

        <input
          type="text"
          placeholder="Search..."
          onChange={(inputString) => searchItems(inputString.target.value)}
        />

        </div>

        <div class="search_container_item">

        <label>
          <input
            type="checkbox"
            checked={filterEnglish}
            onChange={(e) => setFilterEnglish(e.target.checked)}
          />
          English only
        </label>

        </div>

        </div>

        <br></br>

        <ul>
        {(searchInput.length > 0 ? booksToDisplay : list?.docs || []).map((book, idx) => (
          <BookDetail
            key={idx}
            title={book.title}
            author={book.author_name}
            year={book.first_publish_year}
            cover_id={book.cover_i}
            keyForUrl = {book.key}
          />
        ))}
      </ul>
      </div>
    </>
  )
}

export default App
