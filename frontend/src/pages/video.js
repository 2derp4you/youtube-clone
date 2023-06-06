import axios from "axios";
import { useEffect, useState } from "react";
import { HeadProvider, Title, Meta } from 'react-head';
import { Head } from 'react-static';

import Header from "../components/header";
import ReactPlayer from "react-player";

const Video = ({ user }) => {
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
            <Head>
                <title>{video ? video.title : "Loading..."}</title>
                <meta property="og:title" content={video ? video.title : "Loading..."} />
                <meta property="og:description" content={video ? video.description : "Loading..."} />
                <meta property="og:image" content={"https://yt-api.sigve.dev/uploads/" + video.thumbnail} />
                <meta property="og:url" content={"https://yt.sigve.dev/video/" + id} />
                <meta property="og:type" content="video" />
                <meta property="og:video" content={"https://yt-api.sigve.dev/uploads/" + video.url} />
                <meta property="og:video:secure_url" content={"https://yt-api.sigve.dev/uploads/" + video.url} />
                <meta property="og:video:type" content="video/mp4" />
                <meta property="og:video:width" content="1920" />
                <meta property="og:video:height" content="1080" />
                <meta property="og:video:tag" content="video" />
            </Head>
            <Header user={user} />
            <div className="video-content">
                <div className="video-container">
                    <div className="video">
                        {video ? <ReactPlayer url={"https://yt-api.sigve.dev/uploads/" + video.url} controls={true} width="100%" height="100%" /> : "Loading..."}
                    </div>
                    {video ?
                    <div className="video-info">
                        <h1 className="title">{video ? video.title : "Loading..."}</h1>
                        <h2 className="title">Uploaded by: <a href={"/profile/" + video.ownerId}>{video ? video.ownerName : "Loading..."}</a></h2>
                        <h2 className="title">Uploaded at: <span>{video ? new Date(video.createdAt).toDateString() : "Loading..."}</span></h2>
                        <h2 className="title">Description: <span>{video ? video.description : "Loading..."}</span></h2>
                    </div> : <></>}
                </div>
            </div>
        </div>
    )
}

export default Video;