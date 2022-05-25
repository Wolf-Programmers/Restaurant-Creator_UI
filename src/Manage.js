import AddEmployee from "./AddEmployee";
import AddItem from "./AddItem";
import AddItemToMenu from "./AddItemToMenu";
import AddMenu from "./AddMenu";
import AddRestaurant from "./AddRestaurant";
import Cupoun from "./Cupoun";
import Header from './Header';

function Manage()
{
    return(
        <div>
            <Header/>
            <AddRestaurant/>  
            <AddEmployee/>
            <AddItem/>
            <AddMenu/> 
            <AddItemToMenu/>
            <Cupoun/>  
        </div>
    )
}

export default Manage