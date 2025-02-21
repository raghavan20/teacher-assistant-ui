import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mic, Square, Send, Trash} from 'lucide-react';
import type { RecordingState, RecordingDetails } from '../types';

export default function RecordingPage() {
  const navigate = useNavigate();
  const [details, setDetails] = useState<Partial<RecordingDetails>>({});
  const [showRecorder, setShowRecorder] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
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
      grade: formData.get('grade') as string,
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

    const formData = new FormData();
    formData.append('recording', details.audioBlob, 'recording.webm');
    formData.append('subject', details.subject);
    formData.append('grade', details.grade);
    formData.append('user_id', '1');

    try {
      const response = await fetch('http://localhost:5000/upload-recording', {
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
        navigate(`/recording/${analysis.id}`);
      }
    } catch (error) {
      console.error('Error uploading recording:', error);
    }
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
      <div className="max-w-lg mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">New Lesson</h1>
        <form onSubmit={handleSubmitDetails} className="space-y-4">
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
            Subject
          </label>
          <select
            id="subject"
            name="subject"
            required
            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" disabled selected className="text-gray-400">Select Subject</option>
            <option value="English">English</option>
            <option value="Hindi">Hindi</option>
            <option value="Mathematics">Mathematics</option>
            <option value="Science">Science</option>
            <option value="History">History</option>
            <option value="Geography">Geography</option>
            <option value="Economics">Economics</option>
          </select>
        </div>

        <div>
          <label htmlFor="grade" className="block text-sm font-medium text-gray-700 mb-1">
            Grade Level
          </label>
          <select
            id="grade"
            name="grade"
            required
            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
            Topic or Goals for the Lesson
          </label>
          <textarea
            id="notes"
            name="notes"
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Topic Details or Specific Goals for the Lesson (Optional)"
          />
        </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Start Lesson
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Recording</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="text-center mb-4">
          <p className="font-semibold">{details.subject}</p>
          <p className="text-gray-600">Grade {details.grade}</p>
        </div>
        
        <div className="text-center mb-4">
          <div className="text-2xl font-mono mb-2">
            {formatTime(recordingState.duration)}
          </div>
        </div>

        <div className="flex justify-center mb-4">
          {!recordingState.isRecording ? (
            <button
              onClick={startRecording}
              className="p-4 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
            >
              <Mic size={24} />
            </button>
          ) : (
            <button
              onClick={stopRecording}
              className="p-4 bg-gray-600 text-white rounded-full hover:bg-gray-700 transition-colors"
            >
              <Square size={24} />
            </button>
          )}
        </div>

        {recordingState.audioUrl && (
          <>
            <audio src={recordingState.audioUrl} controls className="w-full mb-4" />
            <div className="flex gap-2">
              <button
                onClick={handleAnalyze}
                className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center justify-center gap-2 transition-colors"
              >
                <Send size={20} />
                <span>Analyze</span>
              </button>
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="w-1/4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 flex items-center justify-center gap-2 transition-colors"
              >
                <Trash size={20} />
              </button>
            </div>
          </>
        )}
      </div>
      {showDeleteConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="mb-4">Are you sure you want to delete this recording?</p>
            <div className="flex gap-4">
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
              >
                Yes
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
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