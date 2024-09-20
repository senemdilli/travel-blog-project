import './App.css';
import DesBoxWrapper from './components/DesBoxWrapper';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Footer from './components/Footer'; 

function App() {
  return (
    <div className="App">
      <main>
        <Navbar />
        <Header />
        <div className='intro-wrapper'>
          <p>Welcome to our travel blog!</p>
        </div>
        <div className='content-wrapper'>
          <DesBoxWrapper />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
