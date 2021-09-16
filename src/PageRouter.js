import React, { useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import PageSwitcher from './components/PageSwitcher';
import { useStation } from './contexts/StationContext';
import Home from './routes/Home';
import { getStations } from './utils/data';
import Result from './routes/Result';

function PageRouter() {
  const [station, setStations] = useStation();

  useEffect(() => {
    const sessionData = sessionStorage.getItem('stations');
    sessionData && console.log(sessionData);
    if (sessionData) {
      setStations({ type: 'GET_STATIONS', data: JSON.parse(sessionData) });
    } else {
      getStations(false).then((res) => {
        setStations({ type: 'GET_STATIONS', data: res });
        sessionStorage.setItem('stations', JSON.stringify(res));
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <BrowserRouter>
      <PageSwitcher>
        <Route path="/" exact={true} component={Home} />
        <Route path="/station" component={Result} />
      </PageSwitcher>
    </BrowserRouter>
  );
}

export default PageRouter;
