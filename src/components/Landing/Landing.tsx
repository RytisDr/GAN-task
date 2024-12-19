import { useEffect, useState } from "react";
import {
  BookType,
  getTrendingBooks,
  removePrefix,
  searchForBooks,
} from "../../utils/openLibrary";
import { useSearchParams } from "react-router-dom";
import {
  Content,
  Loading,
  Navigation,
  PageHeading,
  StyledLink,
} from "../../shared-styles/common-components";
import styled from "styled-components";
import BookCard from "../BookCard/BookCard";

const StyledForm = styled.form`
  margin: 20px;
  input {
    height: 50px;
    border: none;
    padding: 0px 10px;
  }
  button {
    height: 50px;
    cursor: pointer;
    margin: 0px;
  }
`;

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
    <>
      <Navigation>
        <StyledLink to="/books">Trending Books</StyledLink>
      </Navigation>
      <Content>
        <StyledForm onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search for a book..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit">Search</button>
        </StyledForm>
        {!searchParams.get("q") && (
          <PageHeading>Top 3 Trending Books Right Now!</PageHeading>
        )}
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

export default Landing;
