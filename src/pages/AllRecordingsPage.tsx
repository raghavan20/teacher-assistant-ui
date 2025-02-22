import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Eye, Search, Sparkles } from 'lucide-react';
import type { RecordingDetails, RecordingAnalysis } from '../types';
import Header from '../components/Header';

export default function AllRecordindsPage() {

  const recordingAnalysis1: RecordingAnalysis = {
    grade: '3',
    id: 1,
    r_depth: 4.0,
    r_full_response_json: {
      feedback: 'Great structure!',
    },
    r_overall_score: 85.5,
    r_structure: 4.5,
    r_style: 4.2,
    r_suggestions_count: 3,
    r_topics_covered: 4,
    r_topics_required: 5,
    subject: 'Hindi',
    timestamp: '2025-02-21T03:42:36.766739',
    user_id: 1,
  };

  const sampleRecording1: RecordingDetails = {
    id: 1,
    subject: 'Hindi',
    grade: '3',
    timestamp: new Date().toISOString(),
    analysis: recordingAnalysis1,
    state: 'DEL',
    board: 'CBSE',
    district: 'New Delhi',
    block: 'Saket',
    topic: 'Grammar',
    notes: 'Focus on sentence structure',
  };
  const sampleRecording2: RecordingDetails = {
    id: 1,
    subject: 'Science',
    grade: '6',
    timestamp: new Date().toISOString(),
    analysis: recordingAnalysis1,
    state: 'DEL',
    board: 'CBSE',
    district: 'New Delhi',
    block: 'Saket',
    topic: 'Physics',
    notes: 'Focus on sentence structure',
  };
  const sampleRecording3: RecordingDetails = {
    id: 1,
    subject: 'English',
    grade: '7',
    timestamp: new Date().toISOString(),
    analysis: recordingAnalysis1,
    state: 'DEL',
    board: 'CBSE',
    district: 'New Delhi',
    block: 'Saket',
    topic: 'Grammar',
    notes: 'Focus on sentence structure',
  };
  const [recordings, setRecordings] = useState<RecordingDetails[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const storedRecordings = [sampleRecording1, sampleRecording2, sampleRecording3];
    setRecordings(storedRecordings);
  }, []);

  const filteredRecordings = recordings.filter(recording =>
    recording.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    recording.grade.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Header pageTitle="Past Lessons" />
      <div className="mb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search by subject or grade..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute top-2 right-3 text-gray-400" size={20} />
        </div>
      </div>
      <div className="space-y-4">
        {filteredRecordings.map((recording, index) => (
          <div
            key={index}
            className="block p-4 bg-white rounded-lg shadow-md hover:bg-gray-100 transition-colors"
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">{recording.subject}</h3>
                <p className="text-gray-600">Grade {recording.grade}</p>
                <p className="text-gray-400 text-sm">{new Date(recording.timestamp).toLocaleString()}</p>
              </div>
              {(recording.analysis) ? (
                <Link className='flex gap-2' to={`/recordings/${recording.id}/analysis`}>
                  <Eye className="text-blue-500" />
                  <p className='text-blue-500'>View Analysis</p>
                </Link>
              ) : (
                <button className="bg-blue-500 text-white p-2 rounded-md flex items-center space-x-2">
                  <Sparkles size={16} className="fill-current" />
                  <p>Analyze</p>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}