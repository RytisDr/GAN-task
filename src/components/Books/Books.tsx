import { Link } from "react-router-dom";

function Books() {
  return (
    <div>
      <h1>Books Page</h1>
      <nav>
        <Link to="/">Home</Link>
      </nav>
      <p>List of Books or Books Page Content Here</p>
    </div>
  );
}

export default Books;
