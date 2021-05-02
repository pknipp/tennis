import React, {useState} from "react";
import { useHistory } from "react-router-dom";

const UploadPhoto = () => {
    const history = useHistory();
    const [image, setImage] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);
    const [url, setUrl] = useState('');

    const handleSubmit = async e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", image);
        setImageLoading(true);
        const data = await fetch('/api/photos', {method: "POST", body: formData});
        setImageLoading(false);
        return (data.ok) ? setUrl((await data.json()).photo_url) : console.log("error");
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input type="file" accept="image/*" onChange={e => setImage(e.target.files[0])} />
                <button type="submit">Submit</button>
                {imageLoading && <p>Loading...</p>}
            </form>
            {!url ? null : <img height="400px" src={url} /> }
        </>
    )
}

export default UploadPhoto;
