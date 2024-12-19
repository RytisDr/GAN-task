import { useEffect, useState } from "react";
import {
  BookType,
  getTrendingBooks,
  removePrefix,
} from "../../utils/openLibrary";
import {
  Content,
  Loading,
  Navigation,
  PageHeading,
  StyledLink,
} from "../../shared-styles/common-components";
import BookCard from "../BookCard/BookCard";

function Books() {
  const [books, setBooks] = useState<BookType[]>([]);
  useEffect(() => {
    getTrendingBooks(setBooks, 10);
  }, []);
  return (
    <>
      <Navigation>
        <StyledLink to="/">Home</StyledLink>
      </Navigation>
      <Content>
        <PageHeading>Top 10 Trending books!</PageHeading>
        {books.length > 0 ? (
          books.map((book) => {
            const cleanedKey = removePrefix(book.key);
            return (
              <BookCard
                key={book.key}
                title={book.title}
                coverId={book.cover_i}
                key_id={cleanedKey}
              />
            );
          })
        ) : (
          <Loading>Loading</Loading>
        )}
      </Content>
    </>
  );
}

export default Books;
