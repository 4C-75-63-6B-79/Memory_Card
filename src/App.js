import "./App.css";
import { useState } from "react";
import { getCharacterAtIndex, getRandomArray } from "./modules/helper_function";

import Image from "./components/image";



function App() {
  
  const [charactersInfo, setCharactersInfo] = useState([]);

  function onButtonClick() {
    const randomNumArray = getRandomArray(4);
    const charactersDataArrayPromises = randomNumArray.map((index) => getCharacterAtIndex(index));
    Promise.all(charactersDataArrayPromises).then((dataArray) => filterCharactersData(dataArray));
  }

  function filterCharactersData(charactersData) {
    const filteredCharactersData = charactersData.map((characterData) => {
      return {
        id: characterData.id,
        image: characterData.image,
        name: characterData.name,
        clicked: false        
      };
    });

    console.log(filteredCharactersData);
  }

  return (
    <div className="App">
      {"hello"}
      <button onClick={onButtonClick}>Click</button>
      <main>
        {
          charactersInfo.map((characterData, index) => <Image key={index} src={characterData.image} name={characterData.name}/>)
        }
      </main>
    </div>
  );
}

export default App;
