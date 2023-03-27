export default function Image({ src, name }) {

    function onImageClick(event) {
        console.log(event.target);
        
    }

    return(
        <img src={src} alt={name} onClick={onImageClick}></img>
    );
}