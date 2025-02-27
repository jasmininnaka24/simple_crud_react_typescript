import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserContextProvider } from "./context/UserContext";

import MainApp from "./pages/MainApp";
import Users from "./pages/user";

const App = () => {
  return (
    <>
      <UserContextProvider>
        <Router>
          <Routes>
            <Route path="/" element={<MainApp />} />
            <Route path="/user" element={<Users />} />
          </Routes>
        </Router>
      </UserContextProvider>
    </>
  );
};

export default App;
