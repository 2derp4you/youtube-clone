import axios from "axios";
import { useEffect, useState } from "react";

import Header from "../components/header";
import ReactPlayer from "react-player";

const Video = () => {
    const [video, setVideo] = useState(null);
    const url = window.location.href.split('/');
    const id = url[url.length - 1];

    useEffect(() => {
        const getVideo = async () => {
            const response = await axios.get('https://yt-api.sigve.dev/video/' + id);
            setVideo(response.data);
        };
        getVideo();
    }, []);

    return (
        <div className="video-page">
            <Header />
            <div className="video-content">
                <div className="video-container">
                    <div className="video">
                        {video ? <ReactPlayer url={"https://yt-api.sigve.dev/uploads/" + video.url} controls={true} width="100%" height="100%" /> : "Loading..."}
                    </div>
                    <h1 className="title">{video ? video.title : "Loading..."}</h1>
                    <h2 className="title">Uploaded by: <span>{video ? video.ownerName : "Loading..."}</span></h2>
                </div>
            </div>
        </div>
    )
}

export default Video;