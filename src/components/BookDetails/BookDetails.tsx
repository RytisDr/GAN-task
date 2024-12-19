import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BookType, getBook, getBookDescription } from "../../utils/openLibrary";
import {
  StyledBookCover,
  StyledBookTitle,
  Content,
  Loading,
  Navigation,
  StyledLink,
} from "../../shared-styles/common-components";
import styled from "styled-components";

const StyledDescription = styled.p``;
const StyledBookDetailsWrapper = styled.div`
  max-width: 350px;
`;

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
    <>
      <Navigation>
        <StyledLink to="/">Home</StyledLink>
        <StyledLink to="/books">Trending Books</StyledLink>
      </Navigation>
      <Content>
        <StyledBookDetailsWrapper>
          <StyledBookTitle>{book.title}</StyledBookTitle>
          {book.covers?.length && (
            <StyledBookCover
              src={`https://covers.openlibrary.org/b/id/${book.covers[0]}-L.jpg`}
              alt={`${book.title} cover`}
            />
          )}
          <StyledDescription>
            {getBookDescription(book.description)}
          </StyledDescription>
        </StyledBookDetailsWrapper>
      </Content>
    </>
  );
}

export default BookDetails;
