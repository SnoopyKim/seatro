import logo from './logo.svg';
import './App.css';
import { useContext, useEffect, useRef, useState } from 'react';
import { AppContext, AppContextProvider } from './contexts/AppContext';
import { getStationInfo, getStations } from './utils/data';

function App() {
  const { station, setStation } = useContext(AppContext)
  const [stationList, setStationList] = useState([])
  const stations = useRef();

  useEffect(() => {
    const sessionData = sessionStorage.getItem('stations')
    sessionData && console.log(sessionData)
    if (sessionData) {
      stations.current = JSON.parse(sessionData)
    } else {
      getStations(true).then(res => {
        stations.current = res
        sessionStorage.setItem('stations', JSON.stringify(res))
      })
    }
  }, [])

  const handleInput = (e) => {
    const text = e.target.value;
    const array = stations.current?.filter(station => station.indexOf(text) !== -1)
    setStationList(array)
  }

  const search = (e) => {
    if (e.code === 'Enter') {
      const name = e.target.value;
      console.log(name, stationList)
      if (name.length > 0 && stationList.length > 0) {
        getStationInfo(stationList[0], true).then(res => {
          console.log(res)
          setStation(res)
          e.target.value = '';
        })
      }
    }
  }

  return (
    <div className="app">
      { !station && <input type="text" onChange={handleInput} onKeyDown={search}/> }
    </div>
  );
}

export default App;
