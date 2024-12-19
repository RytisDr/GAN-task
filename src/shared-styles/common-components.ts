import { Link } from "react-router-dom";
import styled from "styled-components";

export const StyledNavigation = styled.nav`
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
  margin: 20px;
`;

export const Content = styled.div`
  max-width: 1000px;
  margin: auto;
`;
export const PageHeading = styled.h1`
  font-size: 3.2em;
  line-height: 1.1;
`;

export const Loading = styled.p``;

export const StyledBookTitle = styled.h2`
  margin: 0px;
`;
export const StyledBookCover = styled.img`
  max-width: 300px;
  margin: auto;
`;

export const BookCardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
`;
