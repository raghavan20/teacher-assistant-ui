import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RecordingPage from './pages/RecordingPage.tsx';
import AnalysisPage from './pages/AnalysisPage.tsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/record" element={<RecordingPage />} />
        <Route path="/recording/:id" element={<RecordingPage />} />
        <Route path="/recording/:id/analysis" element={<AnalysisPage />} />
      </Routes>
    </Router>
  );
}

export default App;