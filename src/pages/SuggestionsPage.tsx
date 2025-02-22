import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Header from '../components/Header';

const suggestionsData = {
  "suggestions": [
    {
      "description": "Implement a short quiz assessing understanding of consumer rights.  For example, ask \"What can you do if a product you bought is faulty?\" or \"What does ISI mark signify?\"",
      "pedagogy_step": "evaluate",
      "title": "Enhance evaluation with a quiz"
    },
    {
      "description": "Explicitly connect consumer rights to the examples of dishonesty discussed. For instance, after a student shares an example, ask \"Which consumer right is violated here?\"",
      "pedagogy_step": "explain",
      "title": "Strengthen explanation with explicit connections"
    }
  ]
};

export default function SuggestionsPage() {
  const { suggestions } = suggestionsData;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Header pageTitle='Suggestions' />
      <div className='flex items-center mb-8'>
        <ArrowLeft className='cursor-pointer' onClick={() => window.history.back()} />
        <p className='text-lg font-medium px-2'>Back</p>
      </div>
      {suggestions.map((suggestion, index) => (
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