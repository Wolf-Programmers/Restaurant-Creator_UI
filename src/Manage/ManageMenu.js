import Header from '../Header';
import AddItem from './Menu/AddItem';
import AddItemToMenu from './Menu/AddItemToMenu';
import AddMenu from './Menu/AddMenu';

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