import Inventory from './components/inventory';
import Product from './components/product';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Product />} />
        <Route exact path="/inventory" element={<Inventory />} />
      </Routes>
    </Router>
  );
}

export default App;
