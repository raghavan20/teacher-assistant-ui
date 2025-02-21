import React, { useState } from 'react';
import { Plus, Menu, X, CircleUser } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { RecordingAnalysis } from '../types';
import Header from '../components/Header';
import DonutChart from '../components/DonutChart';

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
  const pageTitle = "AI Teaching Assistant";
  const teacherName = "Meenakshi"; // Replace with dynamic data if available

  return (
    <div className="max-w-4xl mx-auto p-4 relative">
      <Header pageTitle={pageTitle} />
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Your Activity</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">Overall Performance</h3>
            <DonutChart percentage={mockAnalyses[0].r_overall_score} />
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">Lessons Completed</h3>
            <p className="text-4xl font-bold text-center">{mockAnalyses.length}</p>
          </div>
        </div>
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

      <Link
        to="/record"
        className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition-colors justify-center items-center flex"
      >
        <Plus size={64} />
      </Link>
    </div>
  );
}