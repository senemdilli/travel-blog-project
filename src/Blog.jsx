import React from 'react';
import './css/App.css';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Footer from './components/Footer'; 

function Blog() {
  return (
    <div className="App">
      <main>
        <Header />
        <div className='intro-wrapper'>
          <p>Welcome traveler! You can find more about your next destination here 🏄‍♀️</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Blog;
