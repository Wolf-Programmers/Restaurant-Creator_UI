import AddMenu from "./AddMenu";
import AddRestaurant from "./AddRestaurant";
import Header from './Header';

function Manage()
{
    return(
        <div>
            <Header/>
            <AddRestaurant/> 
            <AddMenu/>    
        </div>
    )
}

export default Manage