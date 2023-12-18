import { useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const Fallback = () => {

    useEffect(() => {
        const { pathname } = window.location;
        const jwt = pathname.split('/').pop();
        
        const res = axios.get('https://auth-api.hcklikk.com/account', {
            headers: {
                jwt_token: jwt
            }
        });
        res.then(res => {
            const newUser = {
                username: res.data.account.name,
                email: res.data.account.email,
                Oauth: "HC-Auth",
            };

            const res2 = axios.post('https://yt-api.hcklikk.com/user/fallback', newUser);
            res2.then(res2 => {
                localStorage.setItem('autoLogin', true);
                // Set the cookie to expire in 2 days
                Cookies.set('token', res.data.jwt, { expires: 7 });
                window.location.href = '/';
            }).catch(err => {
                console.log(err);
            });
        }).catch(err => {
            console.log(err);
        });
    }, []);

    return (
        <div>
            <h1>Redirecting...</h1>
        </div>
    )
};

export default Fallback;