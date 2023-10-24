import { Button } from './components';
import StyledThemeProvider from './styles/StyledThemeProvider';

function App() {
  return (
    <StyledThemeProvider>
      <div className='App'>
        <Button>Click Me!</Button>
      </div>
    </StyledThemeProvider>
  );
}

export default App;
