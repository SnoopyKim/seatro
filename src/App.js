import logo from './logo.svg';
import './App.css';
import { useContext, useEffect, useRef, useState } from 'react';
import { AppContext, AppContextProvider } from './contexts/AppContext';
import { getStationInfo, getStations } from './utils/data';
import PageSwitcher from './components/PageSwitcher';
import SearchItem from './components/SearchItem';

function App() {
  const { station, setStation, switchStatus, setSwitchStatus } = useContext(AppContext)
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
    if (e.isComposing || e.keyCode === 229) return; 
    if (e.code === 'Enter') {
      e.preventDefault();
      const name = e.target.value;
      console.log(name, stationList)
      if (name.length > 0 && stationList.length > 0) {
        getStationInfo(stationList[0], true).then(res => {
          console.log(res)
          setStation(res)
          setSwitchStatus(true)
          e.target.value = '';
        })
      }
    }
  }

  return (
    <PageSwitcher status={switchStatus}>
      <div style={{ flex: 1, flexDirection: 'column' }}>
        <div style={{ flexDirection: 'column', marginTop: 'calc(50vh - 15px)', alignItems: 'center' }}>
          <input type="text" onChange={handleInput} onKeyDown={search} />
          <div style={{ flexDirection: 'column', zIndex: 1 }}>
            { stationList.map((stationName) => <SearchItem key={stationName} itemName={stationName} />) }
          </div>
        </div>
        
      </div>
    </PageSwitcher>
  );
}

export default App;
