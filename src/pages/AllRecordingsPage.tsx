import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Eye, Search, Sparkles, Trash } from 'lucide-react';
import type { RecordingDetails, RecordingAnalysis } from '../types';
import Header from '../components/Header';
import { toSentenceCase } from '../utils';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function AllRecordingsPage() {
  const [recordings, setRecordings] = useState<RecordingDetails[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchRecordings = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/recordings?user_id=${localStorage.getItem('userId')}`);
        if (response.ok) {
          const data: RecordingDetails[] = await response.json();
          // Sort recordings by latest timestamp to oldest
          data.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
          setRecordings(data);
        } else {
          console.error('Failed to fetch recordings');
        }
      } catch (error) {
        console.error('Error fetching recordings:', error);
      }
    };

    fetchRecordings();
  }, []);

  const filteredRecordings = recordings.filter(recording =>
    recording.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    recording.grade.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteRecording = async (recording_id: number) => {
    try {
      const response = await fetch(`${API_BASE_URL}/recordings/${recording_id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        // Remove the deleted recording from the state
        setRecordings(prevRecordings => prevRecordings.filter(recording => recording.id !== recording_id));
      } else {
        console.error('Failed to delete recording');
      }
    } catch (error) {
      console.error('Error deleting recording:', error);
    }
  };

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
            className="relative block p-4 bg-white rounded-lg shadow-md hover:bg-gray-100 transition-colors"
          > 
            <button className='absolute top-2 right-2'
            onClick={() => handleDeleteRecording(recording.id)}>
              <Trash className='text-red-500' size={20}/>
            </button>
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">{toSentenceCase(recording.subject)}</h3>
                <p className="text-gray-600">Grade {recording.grade}</p>
                <p className="text-gray-400 text-sm">{new Date(recording.timestamp).toLocaleString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}</p>
                <p className="text-gray-400 text-sm">{new Date(recording.timestamp).toLocaleString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true, // 12-hour format with AM/PM
                })}</p>
              </div>
              {recording.r_overall_score ? (
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