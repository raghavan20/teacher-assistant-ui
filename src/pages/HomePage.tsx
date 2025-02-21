import React from 'react';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { RecordingAnalysis } from '../types';

const mockAnalyses: RecordingAnalysis[] = [
  {
    grade: "10th",
    id: 4,
    r_depth: 4.0,
    r_full_response_json: {
      feedback: "Great structure!"
    },
    r_overall_score: 85.5,
    r_structure: 4.5,
    r_style: 4.2,
    r_suggestions_count: 3,
    r_topics_covered: 4,
    r_topics_required: 5,
    subject: "Mathematics",
    timestamp: "2025-02-21T03:42:36.766739",
    user_id: 1
  }
];

export default function HomePage() {
  return (
    <div className="max-w-lg mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Teaching Assistant</h1>
        <Link
          to="/record"
          className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors"
        >
          <Plus size={24} />
        </Link>
      </div>

      <div className="space-y-4">
        {mockAnalyses.map((analysis) => (
          <Link
            key={analysis.id}
            to={`/recording/${analysis.id}`}
            className="block bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <h2 className="font-semibold text-lg">{analysis.subject}</h2>
                <p className="text-gray-600">Grade {analysis.grade}</p>
              </div>
              <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                {Math.round(analysis.r_overall_score)}%
              </div>
            </div>
            <div className="text-sm text-gray-500">
              {new Date(analysis.timestamp).toLocaleDateString()}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}