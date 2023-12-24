import axios from 'axios';
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';

const Header = ({ user }) => {
    const [pfp, setPfp] = useState(null);

    useEffect(() => {
        const getImg = async () => {
            const res = await axios.get('https://auth-api.hcklikk.com/pfp', {
                headers: {
                    jwt_token: Cookies.get('token')
                },
                responseType: 'blob'
            });
            const blob = new Blob([res.data], { type: 'image/png' });
            const url = URL.createObjectURL(blob);
            setPfp(url);
        }
        if (Cookies.get('token')) {
            getImg();
        }
    }, []);

    return (
        <div className="header">
            <a href="/" className="logo"><h1>Youtube <span>HC</span></h1></a>
            {user ? 
                <a href={"/profile/" + user.id} className="profile">{pfp ? <img className='pfp' src={pfp} alt="avatar" /> : <ion-icon name="person-sharp"></ion-icon>}</a>
            : <></>}
        </div>
    );
}

export default Header;