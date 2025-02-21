import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import type { RecordingDetails } from '../types';
import Header from '../components/Header';

export default function AllRecordindsPage() {
  const sampleRecording1: RecordingDetails = {
    id: 4,
    subject: 'Hindi',
    grade: '3',
    timestamp: new Date().toISOString(),
  };
  const sampleRecording2: RecordingDetails = {
    id: 2,
    subject: 'Science',
    grade: '6',
    timestamp: new Date().toISOString(),
  };
  const sampleRecording3: RecordingDetails = {
    id: 3,
    subject: 'English',
    grade: '7',
    timestamp: new Date().toISOString(),
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
          <Link
            to={`/recordings/${recording.id}/analysis`}
            key={index}
            className="block p-4 bg-white rounded-lg shadow-md hover:bg-gray-100 transition-colors"
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">{recording.subject}</h3>
                <p className="text-gray-600">Grade {recording.grade}</p>
                <p className="text-gray-400 text-sm">{new Date(recording.timestamp).toLocaleString()}</p>
              </div>
              <div className="text-blue-500">View Analysis</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}