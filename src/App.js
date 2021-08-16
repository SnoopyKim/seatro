import logo from "./logo.svg";
import "./App.css";
import { useContext, useEffect, useRef, useState } from "react";
import { AppContext, AppContextProvider } from "./contexts/AppContext";
import { getStationInfo, getStations } from "./utils/data";
import PageSwitcher from "./components/PageSwitcher";
import SearchItem from "./components/SearchItem";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";

function App() {
  const { station, setStation, switchStatus, setSwitchStatus } =
    useContext(AppContext);
  const [input, setInput] = useState("");
  const [stationList, setStationList] = useState([]);
  const [stationIndex, setStationIndex] = useState(0);
  const stations = useRef();

  useEffect(() => {
    const sessionData = sessionStorage.getItem("stations");
    sessionData && console.log(sessionData);
    if (sessionData) {
      stations.current = JSON.parse(sessionData);
    } else {
      getStations(true).then((res) => {
        stations.current = res;
        sessionStorage.setItem("stations", JSON.stringify(res));
      });
    }
  }, []);

  useEffect(() => {
    const array =
      input === ""
        ? []
        : stations.current?.filter(
            (station) => station.station_name.indexOf(input) !== -1
          );
    console.log(input, array);
    setStationList(array);
    stationIndex !== 0 && setStationIndex(0);
  }, [input]);

  const handleInput = (e) => {
    const text = e.target.value;
    setInput(text);
  };

  const handleKeyDown = (e) => {
    if (e.isComposing || e.keyCode === 229) return;
    // 자동완성 선택
    if (e.code === "ArrowDown") {
      e.preventDefault();
      stationIndex === stationList.length - 1
        ? setStationIndex(0)
        : setStationIndex(stationIndex + 1);
    } else if (e.code === "ArrowUp") {
      e.preventDefault();
      stationIndex === 0
        ? setStationIndex(stationList.length - 1)
        : setStationIndex(stationIndex - 1);
    }
    // 검색
    if (e.code === "Enter") {
      e.preventDefault();
      search();
    }
  };

  const search = () => {
    console.log(stationList[stationIndex]);
    if (stationList.length > 0) {
      const { station_name, line_number } = stationList[stationIndex];
      getStationInfo(station_name, line_number, true).then((res) => {
        console.log(res);
        setStation(res);
        setSwitchStatus(true);
        setInput("");
      });
    }
  };

  return (
    <PageSwitcher status={switchStatus}>
      <div style={{ flex: 1, flexDirection: "column" }}>
        <div
          style={{
            flexDirection: "column",
            marginTop: "calc(50vh - 15px)",
            alignItems: "center",
            position: "relative",
          }}
        >
          <div className="InputWrapper">
            <div className="SearchWrapper">
              <input
                id="search"
                type="text"
                placeholder="역이름을 검색해주세요"
                onChange={handleInput}
                onKeyDown={handleKeyDown}
                onBlur={() => setStationList([])}
                onFocus={handleInput}
                value={input}
                autoComplete="off"
              />
              <div className="IconWrapper">
                {" "}
                <SearchOutlinedIcon
                  style={{ fontSize: 30, color: "white" }}
                ></SearchOutlinedIcon>
              </div>
            </div>{" "}
            <div
              className="StationList"
              style={{ flexDirection: "column", zIndex: 1 }}
            >
              {stationList.map((stationData, idx) => (
                <SearchItem
                  key={stationData.station_name + stationData.line_number}
                  data={stationData}
                  focus={idx === stationIndex}
                  onHover={() => setStationIndex(idx)}
                  onClick={search}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageSwitcher>
  );
}

export default App;
