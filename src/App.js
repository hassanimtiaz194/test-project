import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { GlobalStyles } from '@mui/material';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Navbar from './components/Navbar';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';

function App() {
  return (
    <>
      <GlobalStyles
        styles={{
          body: {
            margin: 0,
            height: '100vh',
            backgroundImage: 'linear-gradient(180deg,#dfedf0,#e6dada)',
            backgroundSize: 'cover',
            backgroundAttachment: 'fixed',
            fontFamily: '"Inter", sans-serif',
          },
          '#root': {
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
          },
        }}
      />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;