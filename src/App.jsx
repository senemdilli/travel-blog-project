import './App.css';
import DesBoxWrapper from './components/DesBoxWrapper';
import Header from './components/Header';

function App() {
  return (
    <div className="App">
      <main>
        <Header />
        <div className='intro-wrapper'>
          <p>Welcome to our travel blog!</p>
        </div>
        <div className='content-wrapper'>
          <DesBoxWrapper />
        </div>
      </main>
    </div>
  );
}

export default App;
