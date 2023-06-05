import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../components/header";

import logo from "../content/theGang-transparent.png";

const Home = ({user}) => {
    const [videos, setVideos] = useState(null);

    useEffect(() => {
        const getVideos = async () => {
            try {
                const response = await axios.get('https://yt-api.sigve.dev/video');
                setVideos(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        getVideos();
    }, []);

    return (
        <div className="home-page">
            <Header />
            <div className="home-content">
                <div className="big-title">
                    <img src={logo} alt="The Gang" className="big-image" />
                </div>
                <div className="video-container">
                    <h2 className="title">Newest:</h2>
                    <div className="recomended">
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

export default Home;