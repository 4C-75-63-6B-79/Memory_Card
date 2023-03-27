const helperFunction = (function initHelperFunction() {

    function getCharacterAtIndex(index) {
        const characterData = fetch(`https://rickandmortyapi.com/api/character/${index}`, {
          mode: "cors",
        }).then((response) => response.json());
        console.log("clicked");
        return(characterData);
    }

    return{
        getCharacterAtIndex,
    };
})();

const { getCharacterAtIndex } = helperFunction;

export { getCharacterAtIndex };