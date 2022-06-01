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
import { useState } from 'react';
import AddEmployee from './Manage/Employee/AddEmployee';
import EditEmployee from './Manage/Employee/EditEmployee';
import ManageCupoun from './Manage/ManageCupoun';

function App() {
  const [cartItems, setCartItems] = useState([])

  const onAdd = (product) => {
    const exist = cartItems.find(x => x.id === product.id);
    if(exist){
      setCartItems(cartItems.map(x => 
        x.id === product.id ? {...exist, qty: exist.qty + 1} : x
        )
      );
    } else {
      setCartItems([...cartItems, {...product, qty: 1}])
    }
  }

  const onRemove = (product) => {
    const exist = cartItems.find(x => x.id === product.id);
    if(exist.qty === 1){
      setCartItems(cartItems.filter((x) => x.id !== product.id))
    } else {
      setCartItems(cartItems.map(x => 
        x.id === product.id ? {...exist, qty: exist.qty - 1} : x
        )
      );
    }
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
        <Route path='/' element={<RestaurantSearch/>} />
        <Route path='/restaurant' element={<RestaurantList/>} />
        <Route path='/restaurant/:id' element={<RestaurantDetails cartItems={cartItems}  onAdd={onAdd} onRemove={onRemove}/>} />
        <Route path='/manage/menu' element={<ManageMenu/>} />
        <Route path='/manage/restaurant' element={<ManageRestaurant/>}/>
        <Route path='/manage/restaurant/add' element={<AddRestaurant/>}/>
        <Route path='/manage/restaurant/:id' element={<EditRestaurant/>}/>
        <Route path='/manage/employee' element={<ManageEmploee/>} />
        <Route path='/manage/employee/add' element={<AddEmployee/>}/>
        <Route path='/manage/employee/:id' element={<EditEmployee/>} />
        <Route path='/manage/cupoun' element={<ManageCupoun/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='*' element={<RestaurantSearch/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
