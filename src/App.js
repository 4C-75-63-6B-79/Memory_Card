import "./App.css";
import { useState } from "react";
import { getCharacterAtIndex, getRandomArray, shuffle } from "./modules/helper_function";

import Image from "./components/image";



function App() {
  
  const [charactersInfo, setCharactersInfo] = useState([]);

  function onButtonClick() {
    const randomNumArray = getRandomArray(4);
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

  function handleImageClicked(clickedCharacterId) {
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

  return (
    <div className="App">
      {"hello"}
      <button onClick={onButtonClick}>Click</button>
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
