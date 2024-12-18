import { Link } from "react-router-dom";
import styled from "styled-components";

export const Navigation = styled.nav`
  display: flex;
  justify-content: space-around;
  align-items: left;
  padding: 1rem;
  background-color: #f8f9fa;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const StyledLink = styled(Link)`
  font-weight: 500;
  color: #646cff;
  text-decoration: inherit;
  &:hover {
    color: #535bf2;
  }
`;

export const Content = styled.div``;
export const PageHeading = styled.h1`
  font-size: 3.2em;
  line-height: 1.1;
`;

export const Loading = styled.p``;
export const BookTitle = styled.h2``;
export const BookCard = styled.div``;
export const BookCover = styled.img``;
