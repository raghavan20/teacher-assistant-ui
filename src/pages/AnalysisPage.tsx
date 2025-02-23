import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header.tsx';
import AnalysisWidget from '../components/AnalysisWidget.tsx';
import type { RecordingAnalysis } from '../types.tsx';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


export default function AnalysisPage() {
  const { id } = useParams<{ id: string }>();
  const [analysis, setAnalysis] = useState<RecordingAnalysis | null>(null);

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/recordings/${id}`);
        if (response.ok) {
            const data: RecordingAnalysis = await response.json();
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
      <Header pageTitle="Lesson" />
      {analysis ? (
        <AnalysisWidget analysis={analysis} onShowDetails={handleShowDetails} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}