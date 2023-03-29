import "./App.css";
import { useState } from "react";
import { getCharacterAtIndex, getRandomArray, shuffle } from "./modules/helper_function";

import CharacterCard from "./components/character_card";



function App() {

  const [loading, setLoading] = useState(false);  
  const [charactersInfo, setCharactersInfo] = useState(initialCharacterImageLoad);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [level, setLevel] = useState(1);

  function getRawCharacterData(numberOfCharacter = 4) {
    setLoading(true);
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
    setLoading(false);
  }

  function initialCharacterImageLoad() {
    getRawCharacterData();
    return [];
  }

  function checkIfImageAlreadyClicked(clickedCharacterId) {
    const isImageClickedAlready = charactersInfo.some((characterInfo) => {
      return characterInfo["id"] === clickedCharacterId && characterInfo["clicked"];
    });
    return isImageClickedAlready;
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
      updateScoreAndHighScore();
      markImageClickedTrue(clickedCharacterId);
    } else {
      setScore(0);
      setLevel(1);
      getRawCharacterData();
    }
    if(checkIsGameFinished()) {
      const currentLevel = level+1;
      setLevel((level) => level + 1);
      getRawCharacterData(4*currentLevel);
    }
  }

  return (
    <div className="App">
      <header>
        <h1>Rick & Morty Memory Card</h1>
        <div id="scoreContainer">Score: {score} | Best: {highScore}</div>
      </header>
      <main>
        <h2>Level {level}. Choose Your Card!</h2>
        {
          loading === false ? 
          <div id="imageContainer">
          {
            charactersInfo.map((characterInfo) => {
              const { id, name, image } = characterInfo;
              return <CharacterCard key={id} src={image} characterName={name} characterId={id} onImageClicked={handleImageClicked}/>;
            })
          }
          </div> : 
          <div id="loadingContainer">
            <h1>loading lvl {level}...</h1>
          </div>
        }
      </main>
    </div>
  );
}

export default App;
