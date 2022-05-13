import './App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Login from './Login';
import Register from './Register';
import Manage from './Manage';
import RestaurantSearch from './RestaurantSearch';
import RestaurantList from './RestaurantList';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
        <Route path='/' element={<RestaurantSearch/>} />
        <Route path='/restaurants' element={<RestaurantList/>} />
        <Route path='/manage' element={<Manage/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
