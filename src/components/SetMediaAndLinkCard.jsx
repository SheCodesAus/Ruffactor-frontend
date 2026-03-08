import "./GiveKudos.css";
import {useEditingKudos} from "../hooks/use-editing-kudos.js";
import {useState} from "react";

function SetMediaAndLinkCard() {
    const {mediaImage, setMediaImage, mediaLink, setMediaLink} = useEditingKudos();
    const [showImageInput, setShowImageInput] = useState(false);
    const [imageUrl, setImageUrl] = useState(mediaImage);

    const handleAdd = () => {
        if (imageUrl.trim()) {
            setMediaImage(imageUrl.trim());
        }
        setShowImageInput(false);
    };

    const handleCancel = () => {
        setImageUrl(mediaImage);
        setShowImageInput(false);
    };

    const handleDelete = () => {
        setMediaImage("");
        setImageUrl("");
        setShowImageInput(false);
    };

    return (<div className="section media-section">
        <div className="section-header">
            <h3>ATTACH MEDIA OR LINK (OPTIONAL)</h3>
        </div>

        <div className="media-buttons-container">
            {showImageInput ? (
                <div className="media-input-container">
                    <input
                        type="url"
                        placeholder="https://..."
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        className="media-url-input"
                    />
                    <div className="button-row">
                        <button type="button" onClick={handleAdd} className="primary-button">
                            Add
                        </button>
                        <button type="button" onClick={handleCancel} className="secondary-button">
                            Cancel
                        </button>
                        <button type="button" onClick={handleDelete} className="accent-button">
                            Delete
                        </button>
                    </div>
                </div>
            ) : (
                <button type="button" className="media-button" onClick={() => setShowImageInput(true)}>
                    {mediaImage ? (
                            <div className="image-preview" aria-hidden="true"><img src={mediaImage} alt="Kudos image"/>
                            </div>) :
                        (<div className="media-div">
                            <span className="media-icon">🖼️</span>
                            <span>Add Image</span>
                        </div>)}
                </button>
            )}
            <button type="button" className="media-button">
                <div className="media-div">
                    <span className="media-icon">🔗</span>
                    <span>Add Link</span>
                </div>
            </button>
        </div>
    </div>);
}

export default SetMediaAndLinkCard;
