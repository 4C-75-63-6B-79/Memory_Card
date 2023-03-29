export default function CharacterCard({ src, characterName, characterId, onImageClicked }) {
    return(
        <div className="characterCard">
            <img src={src} alt={characterName} onClick={() => onImageClicked(characterId)}></img>
            <p>{characterName}</p>
        </div>
    );
}