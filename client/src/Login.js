import {useState} from 'react'
import { useHistory } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

function Login({onLogin}) {
    document.title = "Songbook | Login"

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [errors, setErrors] = useState([])
    const [showSignUp, setShowSignUp] = useState(false)
    
    let history = useHistory();

    function handleLogin(e) {
        e.preventDefault()
        async function login(){
            const res = await fetch("/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, password }),
            })
            if (res.ok) {
                const user = await res.json()
                onLogin(user)
                history.push('/') 
            } else {
                const err = await res.json()
                setErrors(err.errors)
            }
        };
        login()
    }

    function handleSignUp(e) {
        e.preventDefault()
        setErrors([])
        async function signUp(){
            const res =  await fetch("/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    username,
                    password
                })
            });
            if(res.ok){
                const user = await res.json()
                onLogin(user)
                history.push('/') 
            } else {
                const err = await res.json()
                setErrors(err.errors)
            };
        };
        signUp();
    }

    function switchToSignup() {
        setShowSignUp(false)
        setUsername("")
        setPassword("")
        setErrors([])
    }

    function switchToLogin() {
        setShowSignUp(true)
        setName("")
        setUsername("")
        setPassword("")
        setErrors([])
    }

    return(
        <Card className="text-center">
            
        <div className="login" style ={{paddingTop: '50px'}}>
        <h2>App Name</h2>
        <br/>
        {showSignUp ? 
        <>
        <form onSubmit={handleSignUp}>
            <label style={{marginRight: '10px', width:"75px"}}>Name</label>
            <input style={{borderWidth: "1px", borderRadius: "5px"}} type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)}/><br />
            <label style={{marginRight: '10px'}}>Username</label>
            <input style={{borderWidth: "1px", borderRadius: "5px"}}  type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)}/><br />
            <label style={{marginRight: '10px', width:"75px", marginBottom: '15px'}}>Password</label>
            <input style={{borderWidth: "1px", borderRadius: "5px"}}  type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}/><br />
            <Button style ={{padding: '6px'}} variant="success" type="submit">Create Account</Button>
        </form>
        <div style={{marginTop: "20px", color: "red"}}>{errors.map(err => <p key={err}>{err}</p>)}</div>
        <div>
            <br/>
            Already have an account?
            <Button style ={{padding: '6px', marginLeft: '10px'}} variant="success" onClick={switchToSignup}>Login here</Button>
        </div>
        </>
        : 
        <>
        <form onSubmit={handleLogin}>
            <label style={{marginRight: '6px'}}>Username</label>
            <input style={{borderWidth: "1px", borderRadius: "5px", width:"170px"}}  type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)}/><br />
            <label style={{marginRight: '10px', marginBottom: '15px'}}>Password</label>
            <input style={{borderWidth: "1px", borderRadius: "5px"}}  type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}/><br />
            <Button style ={{padding: '6px'}} variant="success" type="submit">Login</Button>
        </form>
        <div style={{marginTop: "20px", color: "red"}}>{errors.map(err => <p key={err}>{err}</p>)}</div>
        <div>
            Don't have an account?
            <br/>
            <Button style ={{padding: '6px', marginTop:"10px"}} variant="success" onClick={switchToLogin}>Sign up here</Button>
        </div>
        </>
        }
        </div>
        </Card>
    )
}

export default Login;