import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./pages/main";
import { UseContextProvider } from "./context/UseContextData";

function App() {
  return (
    <>
      <UseContextProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Main />}></Route>
          </Routes>
        </Router>
      </UseContextProvider>
    </>
  );
}

export default App;
