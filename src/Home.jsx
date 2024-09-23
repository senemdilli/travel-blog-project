import React from 'react';
import './css/App.css';
import DesBoxWrapper from './components/DesBoxWrapper';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Footer from './components/Footer'; 

function App() {
  return (
    <div className="App">
      <main>
        <Header />
        <div className='intro-wrapper'>
          <p>Welcome traveler! You can find more about your next destination here 🏄‍♀️</p>
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
