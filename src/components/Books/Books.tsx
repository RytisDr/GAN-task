import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  BookType,
  getTrendingBooks,
  removePrefix,
} from "../../utils/openLibrary";
import {
  BookCard,
  BookCover,
  BookTitle,
  Content,
  Loading,
  Navigation,
  PageHeading,
  StyledLink,
} from "../../shared-styles/common-components";

function Books() {
  const [books, setBooks] = useState<BookType[]>([]);
  useEffect(() => {
    getTrendingBooks(setBooks, 10);
  }, []);
  return (
    <Content>
      <Navigation>
        <StyledLink to="/">Home</StyledLink>
      </Navigation>
      <PageHeading>Top 10 Trending books!</PageHeading>
      {books.length > 0 ? (
        books.map((book) => {
          const cleanedKey = removePrefix(book.key);
          return (
            <BookCard key={book.key}>
              <Link to={`/books/${cleanedKey}`}>
                <BookTitle>{book.title}</BookTitle>
                <BookCover
                  src={`https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`}
                  alt={
                    book.title
                      ? `${book.title} book cover.`
                      : "Cover of a book missing."
                  }
                />
              </Link>
            </BookCard>
          );
        })
      ) : (
        <Loading>Loading</Loading>
      )}
    </Content>
  );
}

export default Books;
