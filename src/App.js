import "./App.css";
import { useState } from "react";
import { getCharacterAtIndex, getRandomArray } from "./modules/helper_function";

import Image from "./components/image";



function App() {
  
  const [charactersInfo, setCharactersInfo] = useState({});

  function onButtonClick() {
    const randomNumArray = getRandomArray(4);
    const charactersDataArrayPromises = randomNumArray.map((index) => getCharacterAtIndex(index));
    Promise.all(charactersDataArrayPromises).then((dataArray) => filterCharactersData(dataArray));
  }

  function filterCharactersData(charactersData) {
    const fileteredCharactersInfo = charactersData.reduce((filteredInfo, characterData) => {
      return {
        ...filteredInfo,
        [characterData.id]: {
          id: characterData.id,
          name: characterData.name,
          image: characterData.image,
          clicked: false
        }
      };
    }, {});

    setCharactersInfo(fileteredCharactersInfo);
  }

  function handleImageClicked(clickedCharacterId) {
    const updatedCharactersInfo = {
      ...charactersInfo,
      [clickedCharacterId]: {
        ...charactersInfo[clickedCharacterId],
        clicked: true
      }
    }; 
    setCharactersInfo(updatedCharactersInfo);
  }

  return (
    <div className="App">
      {"hello"}
      <button onClick={onButtonClick}>Click</button>
      <main>
        {
          Object.keys(charactersInfo).map((keyValue, index) => {
            const { id, name, image } = charactersInfo[keyValue];
            return <Image key={id} src={image} characterName={name} characterId={id} onImageClicked={handleImageClicked}/>;
          })
        }
      </main>
    </div>
  );
}

export default App;
