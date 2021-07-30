import {NavLink, BrowserRouter} from 'react-router-dom';

function NavBar() {
    return (
        <BrowserRouter>
          <NavLink className="nav-link" to="/">Home</NavLink>
          <NavLink className="nav-link" to="/login">Login</NavLink>
          <NavLink className="nav-link" to="/mysongs">My Songs</NavLink>
        </BrowserRouter>
    )
}

export default NavBar;