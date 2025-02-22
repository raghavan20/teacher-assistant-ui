import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header.tsx';
import AnalysisWidget from '../components/AnalysisWidget.tsx';
import type { RecordingAnalysis } from '../types.tsx';

export default function AnalysisPage() {
  const { id } = useParams<{ id: string }>();
  const [analysis, setAnalysis] = useState<RecordingAnalysis | null>(null);

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const response = await fetch(`http://localhost:5000/recordings/${id}`);
        if (response.ok) {
            console.log('response:', response);
            const data: RecordingAnalysis = await response.json();
            console.log('data:', data);
            setAnalysis(data);
        } else {
          console.error('Failed to fetch analysis');
        }
      } catch (error) {
        console.error('Error fetching analysis:', error);
      }
    };

    fetchAnalysis();
  }, [id]);

  const handleShowDetails = () => {
    // Handle showing details
    console.log('Show details clicked');
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Header pageTitle="Lesson Analysis" />
      {analysis ? (
        <AnalysisWidget analysis={analysis} onShowDetails={handleShowDetails} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}