import axios from "axios";
import { useEffect, useState } from "react";
import { HeadProvider, Title } from 'react-head';

import Header from "../components/header";

const Upload = ({user}) => {
    const [imgFile, setImgFile] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [file, setFile] = useState(null);

    const handleImgFileChange = (e) => {
        setImgFile(e.target.files[0]);
        setImageUrl(URL.createObjectURL(e.target.files[0]));
    };
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newVideo = {
            title: e.target.title.value,
            description: e.target.description.value,
            ownerId: user.id,
            ownerName: user.username
        };

        const data = new FormData();
        data.append("image", imgFile);
        const resImg = await axios.post(
            "https://yt-api.sigve.dev/upload/image",
            data
        );
        console.log(resImg.data.file);
        newVideo.thumbnail = resImg.data.file;

        const data2 = new FormData();
        data2.append("video", file);
        const resVideo = await axios.post(
            "https://yt-api.sigve.dev/upload/video",
            data2
        );
        console.log(resVideo.data.file);
        newVideo.url = resVideo.data.file;

        try {
            await axios.post("https://yt-api.sigve.dev/video/upload", newVideo);
            window.location.replace("https://yt.sigve.dev");
        }
        catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if(user !== null) {
            if(!user.id) {
                window.location.replace("/");
            }
        }
    }, [user]);

    return (
        <HeadProvider>
        <div className="upload-page">
            <Title>Upload</Title>
            <Header user={user} />
            <div className="upload-content">
                <div className="upload-container">
                    <h1 className="title">Upload</h1>
                    <form className="upload-form" onSubmit={handleSubmit}>
                        <input type="text" id="title" placeholder="title" />
                        <input type="text" id="description" placeholder="description" />
                        <input type="file" id="image" onChange={handleImgFileChange} accept="image/png, image/jpg, image/jpeg" />
                        <input type="file" id="video" onChange={handleFileChange} accept="video/mp4" maxsize="800000000" />
                        <p>100mb upload limit!</p>
                        <input type="submit" className="btn" value="Upload" />
                    </form>
                </div>
            </div>
        </div>
        </HeadProvider>
    )
}

export default Upload;