import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainApp from "./pages/MainApp";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainApp />} />
      </Routes>
    </Router>
  );
}

export default App;
