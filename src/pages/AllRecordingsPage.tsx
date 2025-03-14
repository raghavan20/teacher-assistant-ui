import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, Search, Sparkles, Trash } from 'lucide-react';
import type { RecordingDetails } from '../types';
import Header from '../components/Header';
import { toSentenceCase } from '../utils';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function AllRecordingsPage() {
  const [recordings, setRecordings] = useState<RecordingDetails[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecordings = async () => {
      setLoading(true);
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
      } finally {
        setLoading(false);
      }
    };

    fetchRecordings();
  }, []);

  const filteredRecordings = recordings.filter(recording =>
    recording.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    recording.grade.toLowerCase().includes(searchTerm.toLowerCase()) ||
    recording.topic.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleReanalyze = async (recording: RecordingDetails) => {
    setLoading(true); // Set loading to true when the API call starts

    const formData = new FormData();
    if (recording.audioBlob) {
      formData.append('recording', recording.audioBlob);
    }
    formData.append('subject', recording.subject);
    formData.append('grade', recording.grade);
    formData.append('topic', recording.topic);
    formData.append('state', recording.state || '');
    formData.append('board', recording.board || '');
    formData.append('district', recording.district || '');
    formData.append('block', recording.block || '');
    formData.append('language', recording.language || '');
    formData.append('user_id', String(recording.user_id) || '');

    const timeout = 120000; // 2 minutes in milliseconds

    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Request timed out')), timeout)
    );

    try {
      const response = await Promise.race([
        fetch(`${API_BASE_URL}/recordings/${recording.id}/reanalyze`, {
          method: 'POST',
          body: formData
        }),
        timeoutPromise // Add the timeout promise to race against the fetch request
      ]);

      if (response.ok) {
        const analysis = await response.json();
        navigate(`/recordings/${analysis.recording_id}/analysis`);
      }
    } catch (error) {
      if (error.message === 'Request timed out') {
        console.error('Error: The request took too long to complete.');
      } else {
        console.error('Error uploading recording:', error);
      }
    } finally {
      setLoading(false);
    }
  };

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
    <div>
      {loading ? (
        <div className="min-h-screen px-4 py-4 flex flex-col">
          <div className="justify-center items-center my-auto">
            <img src='./src/assets/analyze.gif' alt="Loading..." className="mx-auto" />
            <p className="text-4xl text-center my-8 animate-bounce">Analyzing..</p>
          </div>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto p-4">
          <Header pageTitle="Past Lessons" />

          <>
            <div className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by subject, topic, or grade..."
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
                  <div className="flex justify-between items-center">
                    <div>
                      <div className='flex items-center gap-2'>
                        <p className="text-lg font-semibold">{toSentenceCase(recording.subject)}</p>
                        <p className="text-sm text-gray-600">Grade {recording.grade}</p>
                      </div>
                      <p className="text-gray-600">{toSentenceCase(recording.topic?.replace('_', ' '))}</p>
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
                    <div>
                    {recording.r_overall_score ? (
                      <Link className='flex items-center gap-2' to={`/recordings/${recording.id}/analysis`}>
                        <Eye className="text-blue-500" />
                        <p className='text-blue-500'>View</p>
                      </Link>
                    ) : (
                      <button className="bg-blue-500 text-white p-2 rounded-md flex items-center space-x-2"
                        onClick={() => handleReanalyze(recording)}>
                        <Sparkles size={16} className="fill-current" />
                        <p>Analyze</p>
                      </button>
                    )}
                    <button className='flex items-center gap-2 mt-6'
                      onClick={() => handleDeleteRecording(recording.id)}>
                      <Trash className='text-red-500' size={20} />
                      <p className='text-red-500'>Delete</p>
                    </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        </div>
      )}
    </div>
  );
}