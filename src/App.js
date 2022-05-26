import './App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Login from './Login';
import Register from './Register';
import RestaurantSearch from './RestaurantSearch';
import RestaurantList from './RestaurantList';
import RestaurantDetails from './RestaurantDetails';
import ManageRestaurant from './Manage/ManageRestaurant';
import ManageMenu from './Manage/ManageMenu';
import ManageEmploee from './Manage/ManageEmployee';
import AddRestaurant from './Manage/Restaurant/AddRestaurant';
import EditRestaurant from './Manage/Restaurant/EditRestaurant';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
        <Route path='/' element={<RestaurantSearch/>} />
        <Route path='/restaurant' element={<RestaurantList/>} />
        <Route path='/restaurant/:id' element={<RestaurantDetails/>} />
        <Route path='/manage/menu' element={<ManageMenu/>} />
        <Route path='/manage/restaurant' element={<ManageRestaurant/>}/>
        <Route path='/manage/restaurant/add' element={<AddRestaurant/>}/>
        <Route path='/manage/restaurant/:id' element={<EditRestaurant/>}/>
        <Route path='/manage/emploee' element={<ManageEmploee/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='*' element={<RestaurantSearch/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
