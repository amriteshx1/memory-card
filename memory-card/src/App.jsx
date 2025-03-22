import { useState, useEffect } from 'react';
import './App.css';

function Header({currentScore, bestScore}){
  return (
    <div className="cnt1">
      <div className="gameDetails">
        <p className="name">Memory-Card</p>
        <p className="details">Get points by clicking on an image but don't click on any more than once!</p>
      </div>
      <div className="score">
      <p>Score: {currentScore}</p>
      <p>Best Score: {bestScore}</p>
      </div>
    </div>
  )
}

function Main({ setCurrentScore, setBestScore, currentScore, bestScore }){
  const [dataArr, setDataArr] = useState([]);
  const [clickedCards, setClickedCards] = useState({});

  async function image() {
    try {
      const response = await fetch("https://digimon-api.vercel.app/api/digimon");
      const data = await response.json();
      const digimonList = data.slice(0, 15).map(el => ({
        name: el.name,
        img: el.img
      }));
  
      setDataArr(digimonList);
    } catch (err) {
      console.log("error fetching data: ", err);
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
      {dataArr.length === 0 ? (
      <p className="loading-text">Loading Game...</p>
    ) : (
      dataArr.map((el) => (
        <div className='cardContainer' key={el.name}
        onClick={() => handleClick(el.name)}>
            <img src={el.img} alt="images" />
            <p>{el.name}</p>
        </div>
      ))
    )}
    </div>
  )
}



function App(){
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  return(
    <div className="container">
      <Header currentScore={currentScore} bestScore={bestScore} />
      <Main
        setCurrentScore={setCurrentScore}
        setBestScore={setBestScore}
        currentScore={currentScore}
        bestScore={bestScore}
      />
    </div>
  )
}

export default App;