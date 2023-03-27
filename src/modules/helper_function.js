const helperFunction = (function initHelperFunction() {

    function getCharacterAtIndex(index) {
        console.log(index);
        const characterData = fetch(`https://rickandmortyapi.com/api/character/${index}`, {
          mode: "cors",
        }).then((response) => response.json());
        return(characterData);
    }

    function getRandomNumber(from = 0, to = 0) {
        return Math.floor(Math.random() * (to - from + 1) + from);
    }

    // the range from 1 to 826 since the rick and morty thing has 826 characters.
    function getRandomArray(length, from=1, to=826) {
        const numArray = [];
        while(numArray.length < length) {
            const num = getRandomNumber(from, to);
            if(numArray.indexOf(num) === -1) {
                numArray.push(num);
            }
        }
        return numArray;
    }

    function shuffle(array = []) {
        const length = array.length;
        let max = length - 1;
        const shuffledArray = array;

        while(max > 0) {
            const randomNumber = getRandomNumber(0, max);
            const temp = shuffledArray[max];
            shuffledArray[max] = shuffledArray[randomNumber];
            shuffledArray[randomNumber] = temp;
            max -= 1;
        }   

        return shuffledArray;        
    }

    return{
        getCharacterAtIndex,
        getRandomNumber,
        getRandomArray,
        shuffle
    };
})();

const { getCharacterAtIndex, getRandomNumber, getRandomArray, shuffle } = helperFunction;

export { getCharacterAtIndex, getRandomNumber, getRandomArray, shuffle };