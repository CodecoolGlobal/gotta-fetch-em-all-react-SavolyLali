import React, { useState, useEffect } from 'react';
import './App.css';
import Locations from './components/Locations';
import FightLocation from './components/FightLocation';

function App() {
  const [url, setUrl] = useState('https://pokeapi.co/api/v2/location?offset=0&limit=20');
  const [data, setData] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isClicked, setIsClicked] = useState(false);

  const handleCountryClick = (location) => {
    setSelectedLocation(location);
    setIsClicked(true);
    setUrl(location.url)
  };

  const handleBackClick = () => {
    setSelectedLocation(null);
    setIsClicked(false);
    setUrl('https://pokeapi.co/api/v2/location?offset=0&limit=20');
  };

  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setData(data);
/*         if(data.areas){
        setSelectedLocation(data.areas[0])
        } */
      });
  }, [url]);



  return (
    <div className="App">
      {data && !selectedLocation &&(
        <Locations locations={data.results} onClick={handleCountryClick}/>
      )}

      {selectedLocation && isClicked && (
        <FightLocation location={selectedLocation} onClick={handleBackClick} />
      )}
    </div>
  );
}

export default App;
