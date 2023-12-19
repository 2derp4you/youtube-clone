import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const Fallback = () => {
    const [error, setError] = useState(null);

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

            const res2 = axios.post('https://yt-api.hcklikk.com/user/fallback', newUser, { withCredentials: true });
            res2.then(res2 => {
                localStorage.setItem('autoLogin', true);
                // Set the cookie to expire in 2 days
                Cookies.set('token', res.data.jwt, { expires: 7 });

                localStorage.setItem('user', JSON.stringify(res2.data.accessToken));
                let now = new Date();
                localStorage.setItem('ttl', JSON.stringify(now.getTime() + (86400000 * 7)));

                window.location.href = '/';
            }).catch(err => {
                console.log(err);
                const res3 = axios.get('https://yt-api.hcklikk.com/user/fallback/' + res.data.account.email + "/" + res.data.account.name + "/HC-Auth", { withCredentials: true });
                res3.then(res3 => {
                    localStorage.setItem('autoLogin', true);
                    // Set the cookie to expire in 2 days
                    Cookies.set('token', res.data.jwt, { expires: 7 });

                    localStorage.setItem('user', JSON.stringify(res3.data.accessToken));
                    let now = new Date();
                    localStorage.setItem('ttl', JSON.stringify(now.getTime() + (86400000 * 7)));

                    window.location.href = '/';
                }).catch(err2 => {
                    console.log(err2);
                    setError("User with this Email already exists");
                });
            });
        }).catch(err => {
            console.log(err);
        });
    }, []);

    return (
        <div>
            <h1>Redirecting...</h1>
            {error ? <p>{error}</p> : <></>}
        </div>
    )
};

export default Fallback;