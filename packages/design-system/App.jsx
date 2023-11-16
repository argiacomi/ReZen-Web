import { StyledProviders } from '@styles';
import AuthDev from './AuthDev';

// import Demo from './Demo';

function App() {
  return (
    <>
      <StyledProviders>
        <div className='App'>
          <AuthDev />
        </div>
      </StyledProviders>
    </>
  );
}

export default App;
