import { useState, useEffect } from 'react';
import './App.css';

function Header(){
  return (
    <div className="cnt1">

    </div>
  )
}

function Main(){
  const [dataArr, setDataArr] = useState([]);

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
  return (
    <div className="cnt2">
      {dataArr.map((el) => (
        <div className='cardContainer' key={el.name}>
            <img src={el.img} alt="images" />
            <p>{el.name}</p>
          
        </div>
      ))}
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