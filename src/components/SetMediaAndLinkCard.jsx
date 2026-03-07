import "./GiveKudos.css";

function SetMediaAndLinkCard() {
    return (<div className="section media-section">
        <div className="section-header">
            <h3>ATTACH MEDIA OR LINK (OPTIONAL)</h3>
        </div>

        <div className="media-buttons-container">
            <button type="button" className="media-button">
                <span className="media-icon">🖼️</span>
                <span>Add Image</span>
            </button>
            <button type="button" className="media-button">
                <span className="media-icon">🔗</span>
                <span>Add Link</span>
            </button>
        </div>
    </div>);
}

export default SetMediaAndLinkCard;
