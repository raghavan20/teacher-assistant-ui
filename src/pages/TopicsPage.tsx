import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Header from '../components/Header';

interface LessonPlanMetrics {
  list_of_all_topics: string[];
  list_of_excellent_topics: string[];
  list_of_good_topics: string[];
  list_of_poor_topics: string[];
  list_of_topics_covered: string[];
}

export default function LessonPlanMetricsPage() {
  const location = useLocation();
  const lesson_plan_metrics = location.state?.lessonPlanMetricsData as LessonPlanMetrics | undefined;
  const list_of_missed_topics = lesson_plan_metrics?.list_of_all_topics.filter(topic => !lesson_plan_metrics.list_of_topics_covered.includes(topic));
  const no_of_missed_topics = list_of_missed_topics?.length;
  console.log(lesson_plan_metrics)
  console.log(list_of_missed_topics);
  console.log(no_of_missed_topics);

  const getTopicTag = (topic: string) => {
    if (lesson_plan_metrics?.list_of_excellent_topics.includes(topic)) {
      return <p className='text-sm font-semibold text-green-500'>EXCELLENT</p>;
    } else if (lesson_plan_metrics?.list_of_good_topics.includes(topic)) {
      return <p className='text-sm font-semibold text-blue-500'>GOOD</p>;
    } else if (lesson_plan_metrics?.list_of_poor_topics.includes(topic)) {
      return <p className='text-sm font-semibold text-yellow-500'>COULD BE IMPROVED</p>;
    } else {
      return <p className='text-sm font-semibold text-gray-500'>UNKNOWN</p>;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Header pageTitle='Lesson Plan Metrics' />
      <div className='flex items-center mb-8'>
        <ArrowLeft className='cursor-pointer' onClick={() => window.history.back()} />
        <p className='text-lg font-medium px-2'>Back</p>
      </div>
      <div className="mb-12">
        <h2 className="text-xl font-bold mb-8 text-center">Topics Covered</h2>
        <div className="pl-5">
          {lesson_plan_metrics?.list_of_topics_covered.map((topic, index) => (
            <div className='mt-8 mb-4'>
              {getTopicTag(topic)}
              <p key={index} className="">{topic}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="mb-12">
        {(no_of_missed_topics === 0) ? (
          <></>
         ) : (
          <div className='mb-12'>
          <h2 className="text-xl font-bold mb-8 text-center">Topics For Next Time</h2>
          <ul className="pl-5">
            {list_of_missed_topics.map((topic, index) => (
              <p key={index} className="mt-8 mb-4">{topic}</p>
            ))}
          </ul>
          </div>
        )}
      </div>
    </div>
  );
}