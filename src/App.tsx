import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage.tsx';
import HomePage from './pages/HomePage';
import AllRecordingsPage from './pages/AllRecordingsPage.tsx';
import RecordingPage from './pages/RecordingPage.tsx';
import AnalysisPage from './pages/AnalysisPage.tsx';
import QuizPage from './pages/QuizPage.tsx';
import ActivityPage from './pages/ActivityPage.tsx';
import SuggestionsPage from './pages/SuggestionsPage.tsx';
import TopicsPage from './pages/TopicsPage.tsx';

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
        <Route path="/recordings/:id/suggestions" element={<SuggestionsPage />} />
        <Route path="/recordings/:id/topics" element={<TopicsPage />} />
        <Route path="/recordings/:recordingId/activity" element={<ActivityPage />} />
        <Route path="/recordings/:recordingId/quiz" element={<QuizPage />} />
      </Routes>
    </Router>
  );
}

export default App;