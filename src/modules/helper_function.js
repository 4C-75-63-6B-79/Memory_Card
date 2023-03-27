const helperFunction = (function initHelperFunction() {

    function getCharacterAtIndex(index) {
        const characterData = fetch(`https://rickandmortyapi.com/api/character/${index}`, {
          mode: "cors",
        }).then((response) => response.json());
        return(characterData);
    }

    function getRandomNumber(from = 0, to = 0) {
        return Math.floor(Math.random() * (to - from + 1) + from);
    }

    return{
        getCharacterAtIndex,
        getRandomNumber
    };
})();

const { getCharacterAtIndex, getRandomNumber } = helperFunction;

export { getCharacterAtIndex, getRandomNumber };