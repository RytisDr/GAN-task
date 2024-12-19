import {
  StyledLink,
  StyledNavigation,
} from "../../shared-styles/common-components";

function Navigation() {
  return (
    <StyledNavigation>
      <StyledLink to="/" aria-label="Go to Home page">
        Home
      </StyledLink>
      <StyledLink to="/books" aria-label="Go to Trending Books page">
        Trending Books
      </StyledLink>
    </StyledNavigation>
  );
}

export default Navigation;
