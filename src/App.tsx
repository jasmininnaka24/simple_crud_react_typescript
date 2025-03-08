import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UserIndex from "./pages/users/UserIndex";
import { UserContextProvider } from "./context/UserContext";
import DisplayUserData from "./pages/users/DisplayUserData";

// Create a QueryClient instance
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserContextProvider>
        <Router>
          <Routes>
            <Route path="/" element={<UserIndex />} />
            <Route path="/user" element={<DisplayUserData />} />
          </Routes>
        </Router>
      </UserContextProvider>
    </QueryClientProvider>
  );
}

export default App;
