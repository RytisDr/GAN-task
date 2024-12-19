import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BookType, getBook, getBookDescription } from "../../utils/openLibrary";
import {
  StyledBookCover,
  StyledBookTitle,
  Content,
  Loading,
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
    <Content>
      <StyledBookDetailsWrapper>
        <StyledBookTitle
          id="book-title"
          aria-label={`Title of the book: ${book.title}`}
        >
          {book.title}
        </StyledBookTitle>
        {book.covers?.length && (
          <StyledBookCover
            src={`https://covers.openlibrary.org/b/id/${book.covers[0]}-L.jpg`}
            alt={`${book.title} book cover image`}
            aria-label={`Cover image of the book titled: ${book.title}`}
          />
        )}
        <StyledDescription aria-labelledby="book-title">
          {getBookDescription(book.description)}
        </StyledDescription>
      </StyledBookDetailsWrapper>
    </Content>
  );
}

export default BookDetails;
