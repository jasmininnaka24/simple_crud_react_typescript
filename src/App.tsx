import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserIndex from "./pages/users/UserIndex";
import { UserContextProvider } from "./context/UserContext";
import DisplayUserData from "./pages/users/DisplayUserData";

function App() {
  return (
    <>
      <UserContextProvider>
        <Router>
          <Routes>
            <Route path="/" element={<UserIndex />} />
            <Route path="/user" element={<DisplayUserData />} />
          </Routes>
        </Router>
      </UserContextProvider>
    </>
  );
}

export default App;
