import { useEffect, useState } from "react";
import {
  BookType,
  getTrendingBooks,
  searchForBooks,
} from "../../utils/openLibrary";
import { useSearchParams } from "react-router-dom";
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
import styled from "styled-components";

const StyledForm = styled.form``;

function Landing() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [books, setBooks] = useState<BookType[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

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
    event.preventDefault();
    if (searchTerm) {
      setSearchParams({ q: searchTerm }); // Update URL with the search term
    } else {
      setSearchParams({}); // Clear the query parameter if search is empty
    }
  };

  return (
    <Content>
      <Navigation>
        <StyledLink to="/books">Books</StyledLink>
      </Navigation>
      <StyledForm onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for books..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Search</button>
      </StyledForm>
      {!searchParams.get("q") && (
        <PageHeading>Top 3 Trending Books Right Now!</PageHeading>
      )}
      {books.length > 0 ? (
        books.map((book) => (
          <BookCard key={book.key}>
            <BookTitle>{book.title}</BookTitle>
            <BookCover
              src={`https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`}
              alt={
                book.title
                  ? `${book.title} book cover.`
                  : "Cover of a book missing."
              }
            />
          </BookCard>
        ))
      ) : (
        <Loading>Loading</Loading>
      )}
    </Content>
  );
}

export default Landing;
