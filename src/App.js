import "./App.css";
import { useState } from "react";
import { getCharacterAtIndex, getRandomArray } from "./modules/helper_function";

import Image from "./components/image";



function App() {
  
  const [charcDataArr, setCharcDataArr] = useState([]);

  function onButtonClick() {
    const randomNumArray = getRandomArray(4);
    const charactersDataArrayPromises = randomNumArray.map((index) => getCharacterAtIndex(index));
    Promise.all(charactersDataArrayPromises).then((dataArray) => setCharcDataArr(dataArray));
  }

  return (
    <div className="App">
      {"hello"}
      <button onClick={onButtonClick}>Click</button>
      <main>
        {
          charcDataArr.map((characterData, index) => <Image key={index} src={characterData.image} name={characterData.name}/>)
        }
      </main>
    </div>
  );
}

export default App;
