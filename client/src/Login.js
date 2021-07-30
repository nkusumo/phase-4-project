function Login() {
    return(
        <>
        <form>
            <label>Username</label>
            <input type="text" placeholder="username"/><br />
            <label>Password</label>
            <input type="text" placeholder="password"/><br />
            <button type="submit">Login</button>
        </form>
        <div>
            Don't have an account?
            <button>Sign up here</button>
        </div>
        </>
    )
}

export default Login;