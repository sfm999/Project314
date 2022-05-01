import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import './App.css';
import Profile from './components/Profile';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';

function App() {

  return (
    <Router>
    <div className="App">
      <Navbar />
      <div className="content">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/profile" element={<Profile />} /> 
          <Route path="/SignIn" element={<SignIn />} />
          <Route exact path="/SignUp" element={<SignUp />} />
        </Routes>
      </div>
    </div>
    </Router>
  );
} 
 //<Route path="/SignIn" element={<SignIn />} />
export default App;
