import axios from 'axios';
import { HeadProvider, Title } from 'react-head';

const Register = () => {

    const register = async (e) => {
        e.preventDefault();
        if(document.getElementById('pass').value !== document.getElementById('pass2').value) {
            alert('Passwords do not match!');
            return;
        }

        const response = await axios.post('https://yt-api.sigve.dev/user/register', {
            username: document.getElementById('username').value,
            email: document.getElementById('email').value,
            password: document.getElementById('pass').value,
        });
        console.log(response);
        if(response.status === 200) {
            localStorage.setItem('user', JSON.stringify(response.data.accessToken));
            let now = new Date();
            localStorage.setItem('ttl', JSON.stringify(now.getTime() + (86400000 * 7)));
            window.location.replace('https://yt.sigve.dev');
        } else {
            alert('There was an error registering your account.');
        }
    };

    return (
        <HeadProvider>
        <div className="register-page">
            <Title>Register</Title>
            <form className="register-form" onSubmit={register}>
                <h1>Register</h1>
                <input type="text" id="username" placeholder="username" />
                <input type="email" id="email" placeholder="email" />
                <input type="password" id="pass" placeholder="password" />
                <input type="password" id="pass2" placeholder="confirm password" />
                <p className="haveAccount">Already have an account? <a href="/login">Login</a></p>
                <input type="submit" value="Register" />
            </form>
        </div>
        </HeadProvider>
    );
}

export default Register;