import './App.css';
import { BrowserRouter as Router, Routes, Route ,Link} from 'react-router-dom';
import Home from './component/Home';
function App() {
  return (
   <Router>
      <nav>
        <Link to="/">To Do List</Link>
        <Link to="/home">Home</Link>
      </nav>
      <h1>Hello in to do list app</h1>
      <Routes>
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
