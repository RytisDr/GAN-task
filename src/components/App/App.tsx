import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "../Landing/Landing";
import "../../global-styles/index.css";
import Books from "../Books/Books";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/books" element={<Books />} />
      </Routes>
    </Router>
  );
}

export default App;
