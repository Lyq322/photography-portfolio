import './App.css';
import Favorites from './Favorites';
import LifeList from './LifeList';
import NavBar from './NavBar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import SpeciesPage from './SpeciesPage';
import Info from './Info';

function App() {
  return (
    <div className='flex flex-col w-full items-center'>
      <Router>
        <NavBar />
        <Routes>
          <Route path='/' element={<Favorites />} />
          <Route path='/life-list' element={<LifeList />} />
          <Route path='/info' element={<Info />} />
          <Route path='/species/:species' element={<SpeciesPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
