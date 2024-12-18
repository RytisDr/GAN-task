import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  BookType,
  getTrendingBooks,
  removePrefix,
} from "../../utils/openLibrary";

function Books() {
  const [books, setBooks] = useState<BookType[]>([]);
  useEffect(() => {
    getTrendingBooks(setBooks, 10);
  }, []);
  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
      </nav>
      <p>Top 10 Trending books!</p>

      {books.length > 0 ? (
        books.map((book) => {
          const cleanedKey = removePrefix(book.key);
          return (
            <div key={book.key}>
              <Link to={`/books/${cleanedKey}`}>
                <p>{book.title}</p>
                <img
                  src={`https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`}
                  alt={
                    book.title
                      ? `${book.title} book cover.`
                      : "Cover of a book missing."
                  }
                />
              </Link>
            </div>
          );
        })
      ) : (
        <p>Loading</p>
      )}
    </div>
  );
}

export default Books;
