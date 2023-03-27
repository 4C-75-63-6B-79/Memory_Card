export default function Image({ src }) {

    function onImageClick(event) {
        console.log(event.target);
    }

    return(
        <img src={src} alt="character" onClick={onImageClick}></img>
    );
}