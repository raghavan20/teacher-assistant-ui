import React, { useState, useRef } from 'react';
import { Mic, Square, Play, Send } from 'lucide-react';
import type { RecordingState } from '../types';

interface AudioRecorderProps {
  onAnalyze: (audioBlob: Blob) => void;
}

export default function AudioRecorder({ onAnalyze }: AudioRecorderProps) {
  const [recordingState, setRecordingState] = useState<RecordingState>({
    isRecording: false,
    audioUrl: null,
    duration: 0,
  });
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<number>(0);

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
      };

      mediaRecorder.start();
      setRecordingState({
        isRecording: true,
        audioUrl: null,
        duration: 0,
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

  const handleAnalyze = () => {
    if (chunksRef.current.length > 0) {
      const audioBlob = new Blob(chunksRef.current, { type: 'audio/webm' });
      onAnalyze(audioBlob);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <div className="flex flex-col items-center space-y-4">
        <div className="text-2xl font-semibold mb-2">
          {recordingState.isRecording ? 'Recording...' : 'Ready to Record'}
        </div>
        
        <div className="text-xl font-mono">
          {formatTime(recordingState.duration)}
        </div>

        <div className="flex space-x-4">
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
          <div className="w-full space-y-4">
            <audio
              src={recordingState.audioUrl}
              controls
              className="w-full"
            />
            <button
              onClick={handleAnalyze}
              className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2"
            >
              <Send size={20} />
              <span>Analyze Recording</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}