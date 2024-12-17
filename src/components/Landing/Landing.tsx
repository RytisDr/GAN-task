import { useEffect, useState } from "react";
import {
  BookType,
  getTrendingBooks,
  searchForBooks,
} from "../../utils/openLibrary";
import { Link, useSearchParams } from "react-router-dom";

function Landing() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [books, setBooks] = useState<BookType[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  // const [loading, setLoading] = useState<boolean>(false); // TODO

  useEffect(() => {
    const query = searchParams.get("q") || ""; // Get the search term from the URL
    setSearchTerm(query);
    setBooks([]);
    if (query) {
      searchForBooks(setBooks, query, 1); // Fetch books for the search query
    } else {
      getTrendingBooks(setBooks); // Fetch trending books if no query
    }
  }, [searchParams]);

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent page reload
    if (searchTerm) {
      setSearchParams({ q: searchTerm }); // Update URL with the search term
    } else {
      setSearchParams({}); // Clear the query parameter if search is empty
    }
  };

  return (
    <>
      <nav>
        <Link to="/books">Books</Link>
      </nav>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for books..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {!searchParams.get("q") && <h1>Top 3 Trending Books Right Now!</h1>}
      <div className="card">
        {books.length > 0 ? (
          books.map((book) => (
            <div key={book.key}>
              <p>{book.title}</p>
              <img
                src={`https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`}
                alt={
                  book.title
                    ? `${book.title} book cover.`
                    : "Cover of a book missing."
                }
              />
            </div>
          ))
        ) : (
          <p>Loading</p>
        )}
      </div>
    </>
  );
}

export default Landing;
