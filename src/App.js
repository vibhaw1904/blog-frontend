import './App.css';
import Blog from './components/Blog';
import Create from './components/Create';
import Home from './components/Home'; 
import Mypost from './components/Mypost';
import Navbar from './components/Navbar';
import Profile from './components/Profile';
import Dashboard from './components/dashboard';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Routes>
        <Route path='/' element={<Dashboard/>}/>
        <Route path='/home' element={<Home />} />
          
          <Route path='/create' element={<Create />} />
          <Route path='/mypost' element={<Mypost />} />
          <Route path='/profile' element={<Profile />} />
          <Route path="/blog/:id" element={<Blog />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
