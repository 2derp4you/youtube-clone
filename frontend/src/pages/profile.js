import axios from "axios";
import { useEffect, useState } from "react";

import Header from "../components/header";

const Profile = ({user}) => {
    const [videos, setVideos] = useState(null);

    useEffect(() => {
        const getVideos = async () => {
            try {
                const response = await axios.get('https://yt-api.sigve.dev/video/owner/' + user.id);
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
        <div className="profile-page">
            <Header />
            <div className="profile-content">
                <div className="profile-container">
                    <h1 className="title">Profile</h1>
                    <h2 className="title">Username: <span>{user ? user.username : "loading..."}</span></h2>
                    <h2 className="title">Email: <span>{user ? user.email: "loading..."}</span></h2>
                    <h2 className="title">Created at: <span>{user ? new Date(user.createdAt).toDateString() : "loading..."}</span></h2>
                    <hr />
                    <a href="/upload" className="btn">Upload New</a>
                    <h2 className="title">My Videos:</h2>
                    <div className="videos">
                        {videos ? videos.slice(0).reverse().map(video => {
                            return (
                                <a href={"/video/" + video._id} className="video">
                                    <img src={"https://yt-api.sigve.dev/uploads/" + video.thumbnail} alt="video" width="100%" height="80%" />
                                    <h3 className="title">{video.title}</h3>
                                </a>
                            )
                        }) : "Loading..."}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;