import { useEffect, useState } from "react";
import { BookType, getTrendingBooks } from "../../utils/openLibrary";
import { Link } from "react-router-dom";

function Landing() {
  const [books, setBooks] = useState<BookType[]>([]);

  useEffect(() => {
    getTrendingBooks(setBooks);
  }, []);

  return (
    <>
      <h1>Trending Books</h1>
      <nav>
        <Link to="/books">Books</Link>
      </nav>
      <div className="card">
        {books.length > 0 ? (
          books.map((book, index) => <p key={index}>{book.title}</p>)
        ) : (
          <p>Loading</p>
        )}
      </div>
    </>
  );
}

export default Landing;
