import axios from 'axios';

const Login = () => {

    const login = async (e) => {
        e.preventDefault();
        try {
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const response = await axios.get('https://yt-api.sigve dev/user/login/' + email + "/" + password, {Credentials: true });
            if(response.status === 200) {
                localStorage.setItem('user', JSON.stringify(response.data.accessToken));
                let now = new Date();
                localStorage.setItem('ttl', JSON.stringify(now.getTime() + (86400000 * 7)));
                window.location.replace('https://yt.sigve dev');
            }
        } catch (err) {
            console.log(err);
            alert('wrong email or password');
        }
    };

    return (
        <div className="login-page">
            <form className="login-form" onSubmit={login}>
                <h1>Login</h1>
                <input type="email" id="email" placeholder="email" />
                <input type="password" id="password" placeholder="password" />
                <p className="noAccount">Don't have an account? <a href="/register">Register</a></p>
                <input type="submit" value="Log In" />
            </form>
        </div>
    );
}

export default Login;