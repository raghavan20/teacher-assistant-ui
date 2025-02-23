import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mic, Square, Sparkles, Trash, Save } from 'lucide-react';
import type { RecordingState, RecordingDetails } from '../types';
import { toSentenceCase } from '../utils.tsx';
import Header from '../components/Header';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function RecordingPage() {
  const navigate = useNavigate();
  const [details, setDetails] = useState<Partial<RecordingDetails>>({});
  const [showRecorder, setShowRecorder] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [lessonNotes, setLessonNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [recordingState, setRecordingState] = useState<RecordingState>({
    isRecording: false,
    audioUrl: null,
    duration: 0
  });

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<number>(0);

  const handleSubmitDetails = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setDetails({
      subject: formData.get('subject') as string,
      state: localStorage.getItem('state') as string,
      board: localStorage.getItem('board') as string,
      district: localStorage.getItem('district') as string,
      block: localStorage.getItem('block') as string,
      grade: formData.get('grade') as string,
      topic: formData.get('topic') as string,
      notes: formData.get('notes') as string,
      timestamp: new Date().toISOString()
    });
    setShowRecorder(true);
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        chunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(chunksRef.current, { type: 'audio/webm' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setRecordingState(prev => ({
          ...prev,
          audioUrl,
          isRecording: false,
        }));
        setDetails(prev => ({
          ...prev,
          audioBlob
        }));
      };

      mediaRecorder.start();
      setRecordingState({
        isRecording: true,
        audioUrl: null,
        duration: 0
      });

      // Start timer
      const startTime = Date.now();
      const updateTimer = () => {
        const duration = Math.floor((Date.now() - startTime) / 1000);
        setRecordingState(prev => ({ ...prev, duration }));
        timerRef.current = requestAnimationFrame(updateTimer);
      };
      updateTimer();
    } catch (err) {
      console.error('Error accessing microphone:', err);
      alert('Unable to access microphone. Please ensure you have granted permission.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && recordingState.isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      cancelAnimationFrame(timerRef.current);
    }
  };

  const handleAnalyze = async () => {
    if (!details.subject || !details.grade || !details.audioBlob) return;

    setLoading(true); // Set loading to true when the API call starts

    const formData = new FormData();
    formData.append('recording', details.audioBlob, 'recording.webm');
    formData.append('subject', details.subject);
    formData.append('grade', details.grade);
    formData.append('topic', details.topic || '');
    formData.append('state', details.state || '');
    formData.append('board', details.board || '');
    formData.append('district', details.district || '');
    formData.append('block', details.block || '');
    formData.append('language', localStorage.getItem('language') || '');
    formData.append('user_id', localStorage.getItem('userId') || '');

    console.log(details.topic);
    console.log('Uploading recording:', formData.get('topic'));
    console.log('Uploading recording:', formData.get('subject'));
    console.log('Uploading recording:', formData.get('grade'));
    console.log('Uploading recording:', formData.get('state'));
    console.log('Uploading recording:', formData.get('board'));
    console.log('Uploading recording:', formData.get('district'));
    console.log('Uploading recording:', formData.get('block'));
    console.log('Uploading recording:', formData.get('language'));
    console.log('Uploading recording:', formData.get('user_id'));

    try {
      const response = await fetch('${API_BASE_URL}/recordings', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        const analysis = await response.json();
        // Store in localStorage
        const recordings = JSON.parse(localStorage.getItem('recordings') || '[]');
        recordings.push({
          ...details,
          analysis
        });
        localStorage.setItem('recordings', JSON.stringify(recordings));
        navigate(`/recordings/${analysis.recording_id}/analysis`);
      }
    } catch (error) {
      console.error('Error uploading recording:', error);
    } finally {
      setLoading(false); // Set loading to false when the API call completes
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const audioUrl = URL.createObjectURL(file);
      setRecordingState(prev => ({
        ...prev,
        audioUrl,
        isRecording: false,
      }));
      setDetails(prev => ({
        ...prev,
        audioBlob: file
      }));
    }
  };

  const handleSave = () => {
    // Implement the save functionality here
    console.log('Recording saved');
  };

  const handleDelete = () => {
    // Implement the delete functionality here
    console.log('Recording deleted');
    setShowDeleteConfirm(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!showRecorder) {
    return (
      <div className="min-h-screen px-4 py-4 flex flex-col">
        <Header pageTitle="New Lesson" />
        <div className="flex-grow flex items-center justify-center">
          <form onSubmit={handleSubmitDetails} className="space-y-4 w-full max-w-lg p-4">
            <div>
              <label htmlFor="subject" className="block text-md font-bold text-gray-700 mt-8 mb-2">
                Subject
              </label>
              <select
                id="subject"
                name="subject"
                required
                className="w-full px-3 py-2 bg-white text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
              >
                <option value="" disabled selected className="text-gray-400">Select Subject</option>
                <option value="english">English</option>
                <option value="hindi">Hindi</option>
                <option value="mathematics">Mathematics</option>
                <option value="science">Science</option>
                <option value="history">History</option>
                <option value="geography">Geography</option>
                <option value="economics">Economics</option>
              </select>
            </div>

            <div>
              <label htmlFor="grade" className="block text-md font-bold text-gray-700 mt-8 mb-2">
                Grade Level
              </label>
              <select
                id="grade"
                name="grade"
                required
                className="w-full px-3 py-2 bg-white text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={selectedGrade}
                onChange={(e) => setSelectedGrade(e.target.value)}
              >
                <option value="" disabled selected className="text-gray-400">Select Grade</option>
                <option value="1">Grade 1</option>
                <option value="2">Grade 2</option>
                <option value="3">Grade 3</option>
                <option value="4">Grade 4</option>
                <option value="5">Grade 5</option>
                <option value="6">Grade 6</option>
                <option value="7">Grade 7</option>
                <option value="8">Grade 8</option>
                <option value="9">Grade 9</option>
                <option value="10">Grade 10</option>
              </select>
            </div>
            <div>
              <label htmlFor="topic" className="block text-md font-bold text-gray-700 mt-8 mb-2">
                Topic
              </label>
              {selectedSubject === 'hindi' && (
                <select
                  id="topic"
                  name="topic"
                  required
                  className="w-full px-3 py-2 bg-white text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={selectedTopic}
                  onChange={(e) => setSelectedTopic(e.target.value)}
                >
                  <option value="" disabled selected className="text-gray-400">Select Topic</option>
                  <option value="nouns">Nouns</option>
                  <option value="pronouns">Pronouns</option>
                  <option value="adjectives">Adjectives</option>
                  <option value="verbs">Verbs</option>
                  <option value="conjunctions">Conjunctions</option>
                  <option value="poems">Poems</option>
                  <option value="story">Story</option>
                  <option value="speaking">Speaking</option>
                  <option value="writing">Writing</option>
                </select>
              )}
              {selectedSubject === 'economics' && (
                <select
                  id="topic"
                  name="topic"
                  required
                  className="w-full px-3 py-2 bg-white text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={selectedTopic}
                  onChange={(e) => setSelectedTopic(e.target.value)}
                >
                  <option value="" disabled selected className="text-gray-400">Select Topic</option>
                  <option value="consumer_literacy">Consumer Literacy</option>
                  <option value="demand_supply">Demand & Supply</option>
                  <option value="public_goods">Public Goods</option>
                  <option value="externalities">Externalities</option>
                  <option value="interest_rates">Interest Rates</option>
                </select>
              )}
              {selectedSubject !== 'hindi' && selectedSubject !== 'economics' && (
                <input
                  type="text"
                  id="topic"
                  name="topic"
                  required
                  className="w-full px-3 py-2 bg-white text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter Topic"
                  value={selectedTopic}
                  onChange={(e) => setSelectedTopic(e.target.value)}
                />
              )}
            </div>

            <div>
              <div className='flex justify-between mt-8 mb-4'>
                <label htmlFor="notes" className="block text-md font-bold text-gray-700">
                  Lesson Plan
                </label>
                <button className='flex items-center gap-2 text-sm text-blue-500 font-medium hover:underline'>
                  <Sparkles size={18} />
                  <p>Generate with AI</p>
                </button>
              </div>
              <textarea
                id="notes"
                name="notes"
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Add Your Lesson Plan or Generate"
                value={lessonNotes}
                onChange={(e) => setLessonNotes(e.target.value)}
              />
            </div>
            <div className='flex justify-center'>
              <button
                type="submit"
                className="w-1/2 py-4 bg-green-500 text-white font-bold py-2 rounded-md hover:bg-green-600 transition-colors mt-8"
              >
                Start Lesson
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-4 flex flex-col">
        {loading ? (
          <div className="justify-center items-center my-auto">
            <img src='./src/assets/analyze.gif' alt="Loading..." className="mx-auto" />
            <p className="text-4xl text-center my-8 animate-bounce">Analyzing..</p>
          </div>
        ) : (
          <>
          <Header pageTitle="Start New Lesson" />
          <div className="flex-grow flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
              <div className="text-center mb-4">
                <h2 className="text-2xl font-semibold">{toSentenceCase(details.subject || '')}</h2>
                <h3 className="text-xl text-gray-600">Grade {details.grade}</h3>
              </div>
              <div className="text-center mt-8 mb-8">
                <div className="text-2xl font-mono mb-2">
                  {formatTime(recordingState.duration)}
                </div>
              </div>

              <div className="flex mt-6 mb-6 justify-center mb-4">
                {!recordingState.isRecording && !recordingState.audioUrl ? (
                  <button
                    onClick={startRecording}
                    className="p-8 my-12 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 transition-colors"
                  >
                    <Mic size={48} />
                  </button>
                ) : null}

                {recordingState.isRecording ? (
                  <button
                    onClick={stopRecording}
                    className="p-8 my-12 bg-gray-600 text-white rounded-full shadow-lg hover:bg-gray-700 transition-colors"
                  >
                    <Square size={48} />
                  </button>
                ) : null
                }
              </div>

              <div className="flex mt-6 mb-6 justify-center mb-4">
                {!recordingState.isRecording && !recordingState.audioUrl ? (
                  <div className="items-center justify-center w-full">
                    <div className='text-center text-lg text-gray-500'>
                      Or Upload a Recording...
                    </div>
                    <div className="flex justify-center items-center py-8">
                      <label className="cursor-pointer">
                        <input
                          type="file"
                          className="hidden"
                          accept="audio/*"
                          onChange={handleFileUpload}
                        />
                        <div className="bg-blue-500 text-white text-center py-3 px-6 rounded-lg shadow-lg transform transition duration-300 ease-in-out hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                          Choose File
                        </div>
                        <p className='text-sm text-gray-400 my-2'>Supports MP3, WAV, OGG</p>
                      </label>
                    </div>
                  </div>

                ) : null}
              </div>

              {recordingState.audioUrl && (
                <>
                  <audio src={recordingState.audioUrl} controls className="w-full mb-4" />
                  <div className="mt-12">
                    <button
                      onClick={handleAnalyze}
                      className="w-full py-4 mt-16 mb-2 font-semibold bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center justify-center gap-2 transition-colors"
                    >
                      <Sparkles className='fill-current' size={20} />
                      <span>Analyze Lesson Now</span>
                    </button>
                    <button
                      onClick={handleSave}
                      className="w-full py-4 mt-2 mb-16 font-semibold bg-blue-300 text-white rounded-md hover:bg-blue-600 flex items-center justify-center gap-2 transition-colors"
                    >
                      <Save className='' size={20} />
                      <span>Save & Analyze Later</span>
                    </button>
                    <button
                      onClick={() => setShowDeleteConfirm(true)}
                      className="w-full py-4 mt-2 font-semibold bg-gray-300 text-white rounded-md hover:bg-red-600 flex items-center justify-center gap-2 transition-colors"
                    >
                      <Trash className='text-red-500' size={20} />
                      <span className='text-red-500'>Delete</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
          </>
          )}
      {showDeleteConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-md mx-8">
            <p className="mb-4">Are you sure you want to delete this recording?</p>
            <div className="flex gap-8 items-center justify-center mt-6">
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors width-1/4"
              >
                Yes
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors width-1/4"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}