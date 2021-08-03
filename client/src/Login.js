import {useState} from 'react'
import { useHistory } from 'react-router-dom'

function Login({onLogin}) {

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

    return(
        <>
        {showSignUp ? 
        <>
        <form onSubmit={handleSignUp}>
            <label>Name</label>
            <input type="text" placeholder="name" value={name} onChange={e => setName(e.target.value)}/><br />
            <label>Username</label>
            <input type="text" placeholder="username" value={username} onChange={e => setUsername(e.target.value)}/><br />
            <label>Password</label>
            <input type="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)}/><br />
            <button type="submit">Create Account</button>
        </form>
        <div>
            Already have an account?
            <button onClick={() => setShowSignUp(false)}>Login here</button>
        </div>
        </>
        : 
        <>
        <form onSubmit={handleLogin}>
            <label>Username</label>
            <input type="text" placeholder="username" value={username} onChange={e => setUsername(e.target.value)}/><br />
            <label>Password</label>
            <input type="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)}/><br />
            <button type="submit">Login</button>
            
        </form>
        <div>
            Don't have an account?
            <button onClick={() => setShowSignUp(true)}>Sign up here</button>
        </div>
        </>
        }
        <div>{errors.map(err => <p key={err}>{err}</p>)}</div>
        </>
    )
}

export default Login;