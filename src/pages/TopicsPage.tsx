import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Header from '../components/Header';

const lessonPlanMetricsData = {
  "lesson_plan_metrics": {
    "list_of_all_topics": [
      "Importance of consumer awareness & literacy",
      "How to improve ones own consumer awareness",
      "How consumer awareness can be improved in society"
    ],
    "list_of_excellent_topics": [
      "Importance of consumer awareness & literacy"
    ],
    "list_of_good_topics": [
      "How to improve ones own consumer awareness"
    ],
    "list_of_poor_topics": [
      "How consumer awareness can be improved in society"
    ],
    "list_of_topics_covered": [
      "Importance of consumer awareness & literacy",
      "How to improve ones own consumer awareness",
      "How consumer awareness can be improved in society"
    ]
  }
};

export default function LessonPlanMetricsPage() {
  const { lesson_plan_metrics } = lessonPlanMetricsData;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Header pageTitle='Lesson Plan Metrics' />
      <div className='flex items-center mb-8'>
        <ArrowLeft className='cursor-pointer' onClick={() => window.history.back()} />
        <p className='text-lg font-medium px-2'>Back</p>
      </div>
      <div className="mb-12">
        <h2 className="text-xl font-bold mb-2">All Topics</h2>
        <ul className="list-disc pl-5">
          {lesson_plan_metrics.list_of_all_topics.map((topic, index) => (
            <li key={index} className="mb-1">{topic}</li>
          ))}
        </ul>
      </div>
      <div className="mb-12">
        <h2 className="text-xl font-bold mb-2">Excellent Topics</h2>
        <ul className="list-disc pl-5">
          {lesson_plan_metrics.list_of_excellent_topics.map((topic, index) => (
            <li key={index} className="mb-1">{topic}</li>
          ))}
        </ul>
      </div>
      <div className="mb-12">
        <h2 className="text-xl font-bold mb-2">Good Topics</h2>
        <ul className="list-disc pl-5">
          {lesson_plan_metrics.list_of_good_topics.map((topic, index) => (
            <li key={index} className="mb-1">{topic}</li>
          ))}
        </ul>
      </div>
      <div className="mb-12">
        <h2 className="text-xl font-bold mb-2">Poor Topics</h2>
        <ul className="list-disc pl-5">
          {lesson_plan_metrics.list_of_poor_topics.map((topic, index) => (
            <li key={index} className="mb-1">{topic}</li>
          ))}
        </ul>
      </div>
      <div className="mb-12">
        <h2 className="text-xl font-bold mb-2">Topics Covered</h2>
        <ul className="list-disc pl-5">
          {lesson_plan_metrics.list_of_topics_covered.map((topic, index) => (
            <li key={index} className="mb-1">{topic}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}