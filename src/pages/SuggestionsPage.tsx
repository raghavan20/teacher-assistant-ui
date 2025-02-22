import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Header from '../components/Header';
import { toSentenceCase } from '../utils';

interface SuggestionsData {
  suggestions: {
    description: string;
    pedagogy_step: string;
    title: string;
  }[];
}

export default function SuggestionsPage() {
  const location = useLocation();
  const suggestionsData = location.state?.suggestionsData as SuggestionsData | undefined;

  if (!suggestionsData) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <Header pageTitle='Suggestions' />
        <div className='flex items-center mb-8'>
          <ArrowLeft className='cursor-pointer' onClick={() => window.history.back()} />
          <p className='text-lg font-medium px-2'>Back</p>
        </div>
        <p>No suggestions data available</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Header pageTitle='Suggestions' />
      <div className='flex items-center mb-8'>
        <ArrowLeft className='cursor-pointer' onClick={() => window.history.back()} />
        <p className='text-lg font-medium px-2'>Back</p>
      </div>
      {suggestionsData.map((suggestion, index) => (
        <div key={index} className="mb-12">
          <p className="text-md font-bold text-blue-500">{suggestion.pedagogy_step.toUpperCase()}</p>
          <h2 className="text-xl font-bold mb-2">{suggestion.title}</h2>
          <p className="text-md mb-2">{suggestion.description}</p>
        </div>
      ))}
    </div>
  );
}