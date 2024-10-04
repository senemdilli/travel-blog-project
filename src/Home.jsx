import React from 'react';
import './css/App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import DestinationList from './components/DestinationList'; 
import DesBoxWrapper from './components/DesBoxWrapper';

function App() {
  return (
    <div className="App">
      <main>
        <Header />
        <div className='intro-wrapper'>
          <p>You can find more about your next destination here 🏄‍♀️</p>
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
