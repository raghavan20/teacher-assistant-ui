import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage.tsx';
import HomePage from './pages/HomePage';
import AllRecordingsPage from './pages/AllRecordingsPage.tsx';
import RecordingPage from './pages/RecordingPage.tsx';
import AnalysisPage from './pages/AnalysisPage.tsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/profile" element={<HomePage />} />
        <Route path="/recordings" element={<AllRecordingsPage />} />
        <Route path="/record" element={<RecordingPage />} />
        <Route path="/recordings/:id" element={<RecordingPage />} />
        <Route path="/recordings/:id/analysis" element={<AnalysisPage />} />
      </Routes>
    </Router>
  );
}

export default App;