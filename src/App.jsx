import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from '../components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from '../components/Home';
import About from '../components/About';
import Compare from '../components/Compare';
import Result from '../components/Result';
import Share from '../components/Share';
import NoInternetModal from '../components/CheckConnection';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <NoInternetModal/>
        <Routes>
          <Route 
            path="/" 
            element={<div className="main-content"><Home /></div>} 
          />
          <Route 
            path="/compare" 
            element={<div className="compare-content"><Compare /></div>} 
          />
          <Route 
            path="/about" 
            element={<div className="about-content"><About /></div>} 
          />
          <Route 
            path="/result" 
            element={<div className="result-content"><Result /></div>} 
          />
          <Route 
            path="/share" 
            element={<div className="share-content"><Share /></div>} 
          />
        </Routes>
      </div>
    </Router>
  
  );
}

export default App;
