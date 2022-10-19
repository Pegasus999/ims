import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Components/Home/HomePage";
import Inventory from "./Components/Inventory/Inventory";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" exact element={<HomePage />} />
          <Route path="/Inventory" element={<Inventory />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
