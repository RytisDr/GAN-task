import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  StyledBookCover,
  StyledBookTitle,
} from "../../shared-styles/common-components";

export const StyledBookCard = styled.div`
  margin: 40px 0px;
  max-width: 300px;
`;

type BookCardProps = {
  title: string;
  coverId?: number;
  key_id?: string;
};

const BookCard: React.FC<BookCardProps> = ({ title, coverId, key_id }) => {
  return (
    <StyledBookCard>
      <Link
        to={`/books/${key_id}`}
        aria-label={`View details of the book: ${title}`}
      >
        <StyledBookCover
          src={
            coverId
              ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`
              : "https://via.placeholder.com/150?text=No+Cover"
          }
          alt={title ? `${title} book cover.` : "Cover of a book missing."}
          aria-labelledby={`book-title-${key_id}`}
        />
        <StyledBookTitle id={`book-title-${key_id}`}>{title}</StyledBookTitle>
      </Link>
    </StyledBookCard>
  );
};

export default BookCard;
