import React, { useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import PageSwitcher from './components/PageSwitcher';
import { useStation } from './contexts/StationContext';
import Home from './routes/Home';
import { getStations } from './utils/data';

function PageRouter() {
  const [station, setStations] = useStation();

  useEffect(() => {
    const sessionData = sessionStorage.getItem('stations');
    sessionData && console.log(sessionData);
    if (sessionData) {
      setStations({ type: 'GET_STATIONS', data: JSON.parse(sessionData) });
    } else {
      getStations(true).then((res) => {
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
      </PageSwitcher>
    </BrowserRouter>
  );
}

export default PageRouter;
