import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "../Landing/Landing";
import "../../shared-styles/index.css";
import Books from "../Books/Books";
import BookDetails from "../BookDetails/BookDetails";
import Navigation from "../Navigation/Navigation";

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/books" element={<Books />} />
        <Route path="/books/:id" element={<BookDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
