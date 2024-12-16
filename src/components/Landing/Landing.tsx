import { useEffect, useState } from "react";
import { BookType, trendingBooks } from "../../utils/openLibrary";

function Landing() {
  const [books, setBooks] = useState<BookType[]>([]);

  useEffect(() => {
    trendingBooks(setBooks);
  }, []);

  return (
    <>
      <h1>Trending Books</h1>
      <div className="card">
        {books.length > 0 ? (
          books.map((book, index) => <p key={index}>{book.title}</p>)
        ) : (
          <p>No books available</p>
        )}
      </div>
    </>
  );
}

export default Landing;
