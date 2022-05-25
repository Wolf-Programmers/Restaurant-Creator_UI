import './App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Login from './Login';
import Register from './Register';
import Manage from './Manage';
import RestaurantSearch from './RestaurantSearch';
import RestaurantList from './RestaurantList';
import RestaurantDetails from './RestaurantDetails';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
        <Route path='/' element={<RestaurantSearch/>} />
        <Route path='/restaurant' element={<RestaurantList/>} />
        <Route path='/restaurant/:id' element={<RestaurantDetails/>} />
        <Route path='/manage' element={<Manage/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='*' element={<RestaurantSearch/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
