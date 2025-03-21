import { useState, useEffect } from 'react';
import './App.css';

function Header({currentScore, bestScore}){
  return (
    <div className="cnt1">
      <p>{currentScore}</p>
      <p>{bestScore}</p>
    </div>
  )
}

function Main(){
  const [dataArr, setDataArr] = useState([]);
  const [clickedCards, setClickedCards] = useState({});
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  async function image() {
    try{
      const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=15");
      const data = await response.json();
      const pokemon = data.results;
      let arr = [];
      for (const el of pokemon){
        arr.push({name : el.name, url : el.url})
      }
      let newArr = [];
      for(const el of arr){
        const response = await fetch(el.url);
        const data = await response.json();
        const img = data.sprites.front_default;
        newArr.push({name : el.name, img : img});
      }
      setDataArr(newArr);
      console.log(newArr)
    }catch(err){
      console.log('error fetching data: ', err);
    }
    
  }

  useEffect(() => {
    image();
  },[])
  
function randomize(array){
  let newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

function handleClick(name){
  if (clickedCards[name]) {
    if (currentScore > bestScore) {
      setBestScore(currentScore);
    }
    setCurrentScore(0);
    setClickedCards({});
    setDataArr(randomize(dataArr));
  }else {
    setClickedCards(prev => ({ ...prev, [name]: true }));
    setCurrentScore(currentScore + 1);
    setDataArr(randomize(dataArr));
  }
}

  return (
    <div className="cnt2">
      {dataArr.map((el) => (
        <div className='cardContainer' key={el.name}
        onClick={() => handleClick(el.name)}>
            <img src={el.img} alt="images" />
            <p>{el.name}</p>
          
        </div>
      ))}
      <Header currentScore={currentScore} bestScore={bestScore} />
    </div>
  )
}



function App(){
  return(
    <div className="container">
      <Header />
      <Main />
    </div>
  )
}

export default App;