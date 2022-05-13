import AddEmployee from "./AddEmployee";
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
            {/* <AddMenu/>  */}
            <Cupoun/>  
        </div>
    )
}

export default Manage