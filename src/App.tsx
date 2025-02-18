import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import AudioRecorder from './components/AudioRecorder';
import AnalysisView from './components/AnalysisView';
import ResourcesPanel from './components/ResourcesPanel';
import SubjectForm from './components/SubjectForm';
import type { AnalysisResult, SubjectDetails, StoredRecording } from './types';

function App() {
  const [showResources, setShowResources] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [subjectDetails, setSubjectDetails] = useState<SubjectDetails | null>(null);
  const [recordings, setRecordings] = useState<StoredRecording[]>(() => {
    const stored = localStorage.getItem('recordings');
    return stored ? JSON.parse(stored) : [];
  });

  const handleSubjectSubmit = (details: SubjectDetails) => {
    setSubjectDetails(details);
  };

  const handleAnalyze = async (audioBlob: Blob) => {
    if (!subjectDetails) return;

    // Store recording in localStorage
    const audioUrl = URL.createObjectURL(audioBlob);
    const newRecording: StoredRecording = {
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      audioUrl,
      subjectDetails,
    };

    const updatedRecordings = [...recordings, newRecording];
    setRecordings(updatedRecordings);
    localStorage.setItem('recordings', JSON.stringify(updatedRecordings));

    // TODO: Replace with actual API call
    const mockResult: AnalysisResult = {
      delivery: 85,
      structure: 78,
      engagement: 92,
      feedback: "Excellent pace and clarity in delivery. Consider incorporating more interactive elements to maintain high engagement levels. The lesson structure was well-organized but could benefit from clearer transitions between topics."
    };
    
    setAnalysisResult(mockResult);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-800">Teaching Assistant</h1>
          <button
            onClick={() => setShowResources(!showResources)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            {showResources ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            {!subjectDetails ? (
              <SubjectForm onSubmit={handleSubjectSubmit} />
            ) : (
              <>
                <AudioRecorder onAnalyze={handleAnalyze} />
                <AnalysisView result={analysisResult} />
                
                {recordings.length > 0 && (
                  <div className="w-full max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold mb-4">Previous Recordings</h3>
                    <div className="space-y-4">
                      {recordings.map((recording) => (
                        <div key={recording.id} className="p-4 bg-gray-50 rounded-lg">
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="font-medium">{recording.subjectDetails.subject}</h4>
                            <span className="text-sm text-gray-500">
                              {new Date(recording.timestamp).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">
                            Grade: {recording.subjectDetails.grade}
                          </p>
                          <audio src={recording.audioUrl} controls className="w-full" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
          
          {showResources && (
            <div className="md:col-span-1">
              <ResourcesPanel />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;