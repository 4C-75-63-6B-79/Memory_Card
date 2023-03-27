import "./App.css";
import { useState } from "react";
import { getCharacterAtIndex, getRandomArray } from "./modules/helper_function";

import Image from "./components/image";



function App() {
  
  const [charactersInfo, setCharactersInfo] = useState({});

  function onButtonClick() {
    const randomNumArray = getRandomArray(2);
    const charactersDataArrayPromises = randomNumArray.map((index) => getCharacterAtIndex(index));
    Promise.all(charactersDataArrayPromises).then((dataArray) => filterCharactersData(dataArray));
  }

  function filterCharactersData(charactersData) {
    const fileteredCharactersInfo = charactersData.reduce((filteredInfo, characterData) => {
      return {
        ...filteredInfo,
        [characterData.id]: {
          name: characterData.name,
          image: characterData.image,
          clicked: false
        }
      };
    });


    // setCharactersInfo(fileteredCharactersInfo);
  }

  return (
    <div className="App">
      {"hello"}
      <button onClick={onButtonClick}>Click</button>
      <main>
        {
          // Object.keys(charactersInfo).map((characterData, index) => <Image key={index} src={characterData.image} name={characterData.name}/>)
        }
      </main>
    </div>
  );
}

export default App;
