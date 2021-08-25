import { StationProvider } from './contexts/StationContext';
import { NavProvider } from './contexts/NavContext';
import PageRouter from './PageRouter';

function App() {
  return (
    <NavProvider>
      <StationProvider>
        <PageRouter />
      </StationProvider>
    </NavProvider>
  );
}

export default App;
