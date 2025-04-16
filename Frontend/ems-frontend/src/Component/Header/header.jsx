import './header.css';
import { Link } from 'react-router-dom';

function Header(){
    return(
    <div className='header'>
        <p className='title'> Emlpoyee / Management System </p>
        
        <div className='link-container'>
            <Link to="/employees" id="e-link" className="nav-link">
                Employees
            </Link>
            <p id="slash" className='nav-link'> /</p>
            <Link to='/departments' id="d-link" className='nav-link'>
                <p className="d-link-text">Departments</p>
            </Link>
        </div>
    </div>
    );
}

export default Header;