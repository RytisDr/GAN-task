import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BookType, getBook } from "../../utils/openLibrary";
import {
  BookCover,
  BookTitle,
  Content,
  Loading,
  Navigation,
  StyledLink,
} from "../../shared-styles/common-components";

function BookDetails() {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<BookType | null>(null);

  useEffect(() => {
    if (id) {
      getBook(setBook, id);
    }
  }, [id]);

  if (!book) {
    return <Loading>Loading book details...</Loading>;
  }

  return (
    <Content>
      <Navigation>
        <StyledLink to="/books">Back to Trending Books</StyledLink>
      </Navigation>
      <BookTitle>{book.title}</BookTitle>
      {book.covers?.length && (
        <BookCover
          src={`https://covers.openlibrary.org/b/id/${book.covers[0]}-L.jpg`}
          alt={`${book.title} cover`}
        />
      )}
      <p>Book Key: {book.key}</p>
    </Content>
  );
}

export default BookDetails;
