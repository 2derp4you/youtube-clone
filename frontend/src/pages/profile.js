import axios from "axios";
import { useEffect, useState } from "react";
import { HeadProvider, Title } from "react-head";

import Header from "../components/header";

const Profile = ({user}) => {
    const [videos, setVideos] = useState(null);
    const url = window.location.href.split('/');
    const id = url[url.length - 1];

    useEffect(() => {
        const getVideos = async () => {
            try {
                const response = await axios.get('https://yt-api.hcklikk.com/video/owner/' + id);
                setVideos(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        getVideos();

        if(user !== null) {
            if(!user.id) {
                window.location.replace("/");
            }
        }
    }, [user]);

    return (
        <HeadProvider>
        <div className="profile-page">
            <Title>{user ? user.username : "Loading..."}</Title>
            <Header user={user} />
            <div className="profile-content">
                <div className="profile-container">
                    {user ? <div>
                        {user.id === id ? <div>
                            <h1 className="title">Profile</h1>
                            <h2 className="title">Username: <span>{user ? user.username : "loading..."}</span></h2>
                            <h2 className="title">Email: <span>{user ? user.email: "loading..."}</span></h2>
                            <h2 className="title">Created at: <span>{user ? new Date(user.createdAt).toDateString() : "loading..."}</span></h2>
                            <button onClick={() => {
                                localStorage.removeItem('user');
                                localStorage.removeItem('ttl');
                                window.location.replace('https://yt.sigve.dev/');
                            }} className="btn2">Logg ut</button>
                            <hr />
                            <a href="/upload" className="btn">Upload New</a>
                        </div> : <></>}
                        <h2 className="title">{id === user.id ? "My Videos:" : "Videos:"}</h2>
                    </div> : <></>}
                    <div className="videos">
                        {videos ? videos.slice(0).reverse().map(video => {
                            return (
                                <a href={"/video/" + video._id} className="video">
                                    <img src={"https://yt-api.hcklikk.com/uploads/" + video.thumbnail} alt="video" width="100%" height="80%" />
                                    <h3 className="title">{video.title}</h3>
                                </a>
                            )
                        }) : "Loading..."}
                    </div>
                </div>
            </div>
        </div>
        </HeadProvider>
    )
}

export default Profile;