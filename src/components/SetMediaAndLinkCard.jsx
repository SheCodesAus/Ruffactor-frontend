import "./GiveKudos.css";
import {useEditingKudos} from "../hooks/use-editing-kudos.js";
import {useState} from "react";

function SetMediaAndLinkCard() {
    const {mediaImage, setMediaImage, mediaLink, setMediaLink} = useEditingKudos();
    const [showImageInput, setShowImageInput] = useState(false);
    const [showLinkInput, setShowLinkInput] = useState(false);
    const [imageUrl, setImageUrl] = useState(mediaImage);
    const [linkUrl, setLinkUrl] = useState(mediaLink);

    const handleAddImage = () => {
        if (imageUrl.trim()) {
            setMediaImage(imageUrl.trim());
        }
        setShowImageInput(false);
    };

    const handleCancelImage = () => {
        setImageUrl(mediaImage);
        setShowImageInput(false);
    };

    const handleDeleteImage = () => {
        setMediaImage("");
        setImageUrl("");
        setShowImageInput(false);
    };

    const handleAddLink = () => {
        if (linkUrl.trim()) {
            setMediaLink(linkUrl.trim());
        }
        setShowLinkInput(false);
    };

    const handleCancelLink = () => {
        setLinkUrl(mediaLink);
        setShowLinkInput(false);
    };

    const handleDeleteLink = () => {
        setMediaLink("");
        setLinkUrl("");
        setShowLinkInput(false);
    };

    return (<div className="section media-section">
        <div className="section-header">
            <h3>ATTACH MEDIA OR LINK (OPTIONAL)</h3>
        </div>

        <div className="media-buttons-container">
            {showImageInput ? (
                <div className="media-input-container">
                    <div className="section-header small">
                        <h4>ADD MEDIA</h4>
                    </div>
                    <input
                        type="url"
                        placeholder="https://..."
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        className="media-url-input"
                    />
                    <div className="button-row">
                        <button type="button" onClick={handleAddImage} className="primary-button">
                            Add
                        </button>
                        <button type="button" onClick={handleCancelImage} className="secondary-button">
                            Cancel
                        </button>
                        <button type="button" onClick={handleDeleteImage} className="accent-button">
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
            {showLinkInput ? (
                <div className="media-input-container">
                    <div className="section-header small">
                        <h4>ADD LINK</h4>
                    </div>
                    <input
                        type="url"
                        placeholder="https://..."
                        value={linkUrl}
                        onChange={(e) => setLinkUrl(e.target.value)}
                        className="media-url-input"
                    />
                    <div className="button-row">
                        <button type="button" onClick={handleAddLink} className="primary-button">
                            Add
                        </button>
                        <button type="button" onClick={handleCancelLink} className="secondary-button">
                            Cancel
                        </button>
                        <button type="button" onClick={handleDeleteLink} className="accent-button">
                            Delete
                        </button>
                    </div>
                </div>
            ) : (
                <button type="button" className="media-button" onClick={() => setShowLinkInput(true)}>
                    {mediaLink ? (
                            <div className="link-preview" aria-hidden="true"><img src={mediaLink} alt="Kudos link"/>
                            </div>) :
                        (<div className="media-div">
                            <span className="media-icon">🔗</span>
                            <span>Add Link</span>
                        </div>)}
                </button>
            )}
        </div>
    </div>);
}

export default SetMediaAndLinkCard;
