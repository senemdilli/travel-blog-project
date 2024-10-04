import React from 'react';
import './css/App.css';
import Header from './components/Header';
import Footer from './components/Footer'; 

function Blog() {
  return (
    <div className="App">
      <main>
      <Header />
        <div className='intro-wrapper'>
          <p>
            Developed by <a href="https://www.bento.me/senemdilli" target="_blank" rel="noopener noreferrer" className="link">Senem Dilli</a> 🦦
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Blog;
