export default function Image({ src, characterName, characterId, onImageClicked }) {
    return(
        <img src={src} alt={characterName} onClick={() => onImageClicked(characterId)}></img>
    );
}