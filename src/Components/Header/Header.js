import React from 'react'
import './Header.scss'
import FilterListIcon from '@material-ui/icons/FilterList';
import SearchIcon from '@material-ui/icons/Search';
import PersonIcon from '@material-ui/icons/Person';
import { useDispatch } from 'react-redux';
import isFilter from '../../Assets/Actions/FilterAction';


function Header() {
    const dispath = useDispatch();
    return (
        <div className='header_container'>
            <h1><strong>PICK</strong>BOOKS</h1>

            <div className="search_container">
                <button onClick = {()=>dispath(isFilter())}>Filter<FilterListIcon/></button>
                <input type="text" 
                placeholder='Search books, generes, authors......' />
                <SearchIcon/>
            </div>
            <PersonIcon/>
        </div>
    )
}

export default Header
