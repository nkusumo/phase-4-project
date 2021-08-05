import {NavLink, useHistory} from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'

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
    <Navbar style={{backgroundColor: 'black'}} variant="dark">
      <Container>
        <Nav>
          {user ? 
          <>
            <Navbar.Text className="ml-auto" style={{fontWeight: 'bold', marginRight: "20px", color: 'white'}}>Welcome, {user.name}!&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </Navbar.Text>
            <Nav.Link className="nav-link" href="/">Home</Nav.Link>
            <Nav.Link className="nav-link" href="/mysongs">My Songs</Nav.Link>
            <Button variant="outline-success" onClick={handleLogout} style={{borderWidth: 0}}>Logout</Button>
          </>
          :
          <>
            <Nav.Link className="nav-link" href="/">Home</Nav.Link>
            <Nav.Link className="nav-link" href="/login">Login</Nav.Link>
          </>}
        </Nav>
      </Container>
    </Navbar>
  )
}

export default NavBar;