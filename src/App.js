import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Components/Home/HomePage";
import Inventory from "./Components/Inventory/Inventory";
import Sell from "./Components/SellPage/Sell";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" exact element={<HomePage />} />
          <Route path="/Inventory" element={<Inventory />} />
          <Route path="/sell" element={<Sell />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
