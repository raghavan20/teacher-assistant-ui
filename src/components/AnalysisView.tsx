import React from 'react';
import { BarChart2, BookOpen, BrainCircuit, Users } from 'lucide-react';
import type { AnalysisResult } from '../types';

interface AnalysisViewProps {
  result: AnalysisResult | null;
}

export default function AnalysisView({ result }: AnalysisViewProps) {
  if (!result) return null;

  const metrics = [
    { label: 'Delivery', value: result.delivery, icon: BarChart2 },
    { label: 'Structure', value: result.structure, icon: BookOpen },
    { label: 'Engagement', value: result.engagement, icon: Users },
  ];

  return (
    <div className="w-full max-w-md mx-auto p-4 bg-white rounded-lg shadow-md space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">Analysis Results</h2>
      
      <div className="grid grid-cols-3 gap-4">
        {metrics.map(({ label, value, icon: Icon }) => (
          <div key={label} className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
            <Icon className="w-6 h-6 text-blue-500 mb-2" />
            <span className="text-sm text-gray-600">{label}</span>
            <span className="text-lg font-semibold">{value}%</span>
          </div>
        ))}
      </div>

      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-medium mb-2">Feedback</h3>
        <p className="text-gray-700">{result.feedback}</p>
      </div>
    </div>
  );
}