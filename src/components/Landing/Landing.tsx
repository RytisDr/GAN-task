import { useEffect, useState } from "react";
import {
  BookType,
  getTrendingBooks,
  removePrefix,
  searchForBooks,
} from "../../utils/openLibrary";
import { useSearchParams } from "react-router-dom";
import {
  BookCardWrapper,
  Content,
  Loading,
  PageHeading,
} from "../../shared-styles/common-components";
import styled from "styled-components";
import BookCard from "../BookCard/BookCard";

const StyledForm = styled.form`
  margin-top: 20px;
  font-family: inherit;
  input {
    height: 50px;
    border: none;
    padding: 0px 10px;
    font-family: inherit;
  }
  button {
    height: 50px;
    cursor: pointer;
    margin: 0px;
    font-family: inherit;
    border-radius: 0px;
    border: none;
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
    <Content>
      <StyledForm onSubmit={handleSearch} aria-label="Search for books">
        <input
          type="text"
          placeholder="Search for a book..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          aria-label="Enter book title to search"
        />
        <button type="submit" aria-label="Submit search">
          Search
        </button>
      </StyledForm>

      {!searchParams.get("q") && (
        <PageHeading>Top 3 Trending Books Right Now!</PageHeading>
      )}

      <BookCardWrapper>
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
      </BookCardWrapper>
    </Content>
  );
}

export default Landing;
