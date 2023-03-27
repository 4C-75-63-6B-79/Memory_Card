import "./App.css";
import { useState } from "react";
import { getCharacterAtIndex, getRandomArray } from "./modules/helper_function";

import Image from "./components/image";



function App() {
  
  const [charcDataArr, setCharcDataArr] = useState([]);

  function onButtonClick() {
    const randomNumArray = getRandomArray(4);
    const characterDataArrayPromises = randomNumArray.map((index) => getCharacterAtIndex(index));
    Promise.all(characterDataArrayPromises).then((dataArray) => setCharcDataArr(dataArray));
  }

  return (
    <div className="App">
      {"hello"}
      <button onClick={onButtonClick}>Click</button>
      {
        charcDataArr.map((characterData) => <Image key={characterData.id} src={characterData.image} />)
      }
    </div>
  );
}

export default App;
