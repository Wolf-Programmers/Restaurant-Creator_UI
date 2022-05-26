import AddItem from "../AddItem";
import AddItemToMenu from "../AddItemToMenu";
import AddMenu from "../AddMenu";
import Header from '../Header';

function ManageMenu()
{
    return(
        <div>
            <Header/>
            <AddItem/>
            <AddMenu/> 
            <AddItemToMenu/> 
        </div>
    )
}

export default ManageMenu