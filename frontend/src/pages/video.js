import axios from "axios";
import { useEffect, useState } from "react";
import { HeadProvider, Title, Meta } from 'react-head';

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
        <HeadProvider>
            <div className="video-page">
                <Title>test</Title>
                <Meta property="og:site_name" content="Youtube HC" />
                <Meta property="og:url" content={"https://yt.sigve.dev/video/647e60ebc21877bc6a9fae13"} />
                <Meta property="og:type" content="video.other" />
                <Meta property="og:title" content={"monke"} />
                <Meta property="og:image" content={"https://yt-api.sigve.dev/uploads/1686003946316-347596002-hqdefault.jpg"} />
                <Meta property="og:video" content={"https://yt-api.sigve.dev/uploads/1686003947442-573307690-yt5s.com-Life could be dream monke(720p).mp4"} />
                <Meta property="og:video:type" content="video/mp4" />
                <Meta property="og:video:secure_url" content={"https://yt-api.sigve.dev/uploads/1686003947442-573307690-yt5s.com-Life could be dream monke(720p).mp4"} />
                <Meta property="og:video:height" content="720" />
                <Meta property="og:video:width" content="1280" />
                <Meta property="og:image:height" content="720" />
                <Meta property="og:image:width" content="1280" />

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
        </HeadProvider>
    )
}

export default Video;