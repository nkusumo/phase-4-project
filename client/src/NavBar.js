import {NavLink} from 'react-router-dom';

function NavBar() {
  return (
    <>
    <NavLink className="nav-link" to="/">Home</NavLink>
    <NavLink className="nav-link" to="/login">Login</NavLink>
    <NavLink className="nav-link" to="/mysongs">My Songs</NavLink>
    </>
  )
}

export default NavBar;