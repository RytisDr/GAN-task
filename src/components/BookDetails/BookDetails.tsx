import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { BookType, getBook } from "../../utils/openLibrary";

function BookDetails() {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<BookType | null>(null);

  useEffect(() => {
    if (id) {
      getBook(setBook, id);
    }
  }, [id]);

  if (!book) {
    return <p>Loading book details...</p>;
  }

  return (
    <div>
      <nav>
        <Link to="/books">Back to Books</Link>
      </nav>
      <h1>{book.title}</h1>
      {book.covers?.length && (
        <img
          src={`https://covers.openlibrary.org/b/id/${book.covers[0]}-L.jpg`}
          alt={`${book.title} cover`}
        />
      )}
      <p>Book Key: {book.key}</p>
    </div>
  );
}

export default BookDetails;
