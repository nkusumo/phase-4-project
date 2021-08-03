import {NavLink, useHistory} from 'react-router-dom';

function NavBar({user, setUser}) {

  let history = useHistory()

  function handleLogout() {
    async function logout() {
      const res = await fetch("/logout", {
        method: 'DELETE'
      })
      if (res.ok) {
        setUser(null)
        history.push('/')
      }
    }
    logout()
  }

  return (
    <>
    <NavLink className="nav-link" to="/">Home</NavLink>
    {/* <NavLink className="nav-link" to="/mysongs">My Songs</NavLink>
    <button className="nav-link" to="/logout" onClick={handleLogout}>Logout</button>
    <NavLink className="nav-link" to="/login">Login</NavLink> */}
    {user ? 
    <>
    <h5>Welcome, {user.name}!</h5>
    <NavLink className="nav-link" to="/mysongs">My Songs</NavLink>
    <button className="nav-link" onClick={handleLogout}>Logout</button></>
    : <NavLink className="nav-link" to="/login">Login</NavLink>
  }
    </>
  )
}

export default NavBar;