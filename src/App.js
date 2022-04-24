import './App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Header from './Header';
import Login from './Login';
import Register from './Register';
import RestaurantList from './RestaurantList';
import Manage from './Manage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Header/>
        <Routes>
        <Route path='/' element={<RestaurantList/>} />
        <Route path='/manage' element={<Manage/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
