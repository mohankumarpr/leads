import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { Navbar } from "./Components/Shared/navbar";
import { Home } from "./Components/Home/home";
import { Leads } from "./Components/LeadDetails/leads";
import { UserProvider } from "./Context/UserContext"; 

function App() {
  return (
    <UserProvider>
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/lead" element={<Leads />}></Route>
        </Routes>
      </div>
    </Router>
    </UserProvider>
  );
}

export default App;
