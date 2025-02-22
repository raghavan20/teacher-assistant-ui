import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Header from '../components/Header';

interface SuggestionsData {
  suggestions: {
    description: string;
    pedagogy_step: string;
    title: string;
  }[];
}

export default function SuggestionsPage() {
  const location = useLocation();
  const { suggestionsData } = location.state as { suggestionsData?: SuggestionsData } || {};

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
      {suggestionsData.suggestions.map((suggestion, index) => (
        <div key={index} className="mb-12">
          <h2 className="text-xl font-bold mb-2">{suggestion.title}</h2>
          <p className="text-md mb-2">{suggestion.description}</p>
          <p className="text-md font-semibold">Pedagogy Step:</p>
          <p className="text-md mb-4">{suggestion.pedagogy_step}</p>
        </div>
      ))}
    </div>
  );
}