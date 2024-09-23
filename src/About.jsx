import React from 'react';
import './css/App.css';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Footer from './components/Footer'; 

function About() {
  return (
    <div className="App">
      <main>
        <Header />
        <div className='intro-wrapper'>
          <p>Developed by Senem Dilli 🦦</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default About;
