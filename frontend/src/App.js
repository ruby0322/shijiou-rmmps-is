import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Home from './pages/Home.js';
import Menu from './pages/Menu.js';
import MenuDashboard from './pages/MenuDashboard.js';
import WaitingListDashboard from './pages/WaitingListDashboard.js';

const App = () => {
  return (
    <div className="App">
      {/* ShiJiou RMMPS IS */}
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/home/' element={<Home />} />
        <Route exact path='/menu/' element={<Menu />} />
        <Route exact path='/menu-dashboard/' element={<MenuDashboard />} />
        <Route exact path='/waiting-list-dashboard/*' element={<WaitingListDashboard />} />
      </Routes>
    </div>
  );
}

export default App;
