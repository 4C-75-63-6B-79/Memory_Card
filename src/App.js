import "./App.css";
import { useState } from "react";
import { getCharacterAtIndex, getRandomArray, shuffle } from "./modules/helper_function";

import Image from "./components/image";



function App() {
  
  const [charactersInfo, setCharactersInfo] = useState([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [level, setLevel] = useState(1);

  function onButtonClick() {
    getRawCharacterData();
  }

  function getRawCharacterData(numberOfCharacter = 4) {
    const randomNumArray = getRandomArray(numberOfCharacter);
    const charactersDataArrayPromises = randomNumArray.map((index) => getCharacterAtIndex(index));
    Promise.all(charactersDataArrayPromises).then((dataArray) => filterCharactersData(dataArray));
  }

  function filterCharactersData(charactersData) {
    const fileteredCharactersInfo = charactersData.map((characterData) => {
      return {
        id: characterData.id,
        name: characterData.name, 
        image: characterData.image,
        clicked: false,
      };
    });

    setCharactersInfo(fileteredCharactersInfo);
  }

  function markImageClickedTrue(clickedCharacterId) {
    const updatedCharactersInfo = charactersInfo.map((characterInfo) => {
      if(characterInfo.id === clickedCharacterId) {
        return {
          ...characterInfo,
          clicked: true
        };
      }
      return {
        ...characterInfo
      };
    });
    setCharactersInfo(shuffle(updatedCharactersInfo));
  }

  function checkIfImageAlreadyClicked(clickedCharacterId) {
    const isImageClickedAlready = charactersInfo.some((characterInfo) => {
      return characterInfo["id"] === clickedCharacterId && characterInfo["clicked"];
    });
    return isImageClickedAlready;
  }

  function updateScoreAndHighScore() {
    setScore((score) => score + 1);
    if(score === highScore) {
      setHighScore((highScore) => highScore + 1);
    }
  }

  function checkIsGameFinished() {
    const totalCharacters = charactersInfo.length;
    const totalClickedCharacters = charactersInfo.filter((characterInfo) => characterInfo["clicked"]).length;
    const totalUnclickedCharacters = totalCharacters - totalClickedCharacters;
    return totalUnclickedCharacters === 1;
  }
  
  function handleImageClicked(clickedCharacterId) {
    const isImageClickedAlready = checkIfImageAlreadyClicked(clickedCharacterId);
    if(!isImageClickedAlready) {
      console.log("increase score");
      updateScoreAndHighScore();
      markImageClickedTrue(clickedCharacterId);
    } else {
      console.log(" you lose");
      setScore(0);
      setLevel(0);
      getRawCharacterData();
    }
    if(checkIsGameFinished()) {
      console.log("next level");
      setLevel((level) => level + 1);
      getRawCharacterData();
    }
  }

  return (
    <div className="App">
      {"hello"}
      <button onClick={onButtonClick}>Click</button>
      <p>Level: {level}</p>
      <p>Score: {score}</p>
      <p>HighScore: {highScore}</p>
      <main>
        {
          charactersInfo.map((characterInfo) => {
            const { id, name, image } = characterInfo;
            return <Image key={id} src={image} characterName={name} characterId={id} onImageClicked={handleImageClicked}/>;
          })
        }
      </main>
    </div>
  );
}

export default App;
