import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Header from '../components/Header';
import StarRating from '../components/StarRating';

interface LessonDetailsData {
    lesson_outline: string[];
    pedagogy_metrics: {
        reason_for_elaborate_score: string;
        reason_for_engage_score: string;
        reason_for_explore_score: string;
        reason_for_explain_score: string;
        reason_for_evaluate_score: string;
    };
    teaching_guidelines_metrics: {
        list_of_excellent_guidelines: string[];
        list_of_good_guidelines: string[];
        list_of_poor_guidelines: string[];
    };
};

interface LessonPlanMetrics {
    list_of_all_topics: string[];
    list_of_excellent_topics: string[];
    list_of_good_topics: string[];
    list_of_poor_topics: string[];
    list_of_topics_covered: string[];
}

export default function LessonDetailsPage() {
    const location = useLocation();
    const { predictionsData, structureStars, depthStars, styleStars } = location.state as {
        predictionsData: LessonDetailsData;
        lessonPlanMetricsData: LessonPlanMetrics;
        structureStars: number;
        depthStars: number;
        styleStars: number;
    };
    const lesson_plan_metrics = location.state?.lessonPlanMetricsData as LessonPlanMetrics | undefined;
    const list_of_missed_topics = lesson_plan_metrics?.list_of_all_topics.filter(topic => !lesson_plan_metrics.list_of_topics_covered.includes(topic));
    const no_of_missed_topics = list_of_missed_topics?.length;

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

    if (!predictionsData) {
        return (
            <div className="max-w-4xl mx-auto p-4">
                <Header pageTitle='Lesson Details' />
                <div className='flex items-center mb-8'>
                    <ArrowLeft className='cursor-pointer' onClick={() => window.history.back()} />
                    <p className='text-lg font-medium px-2'>Back</p>
                </div>
                <p>No lesson details data available</p>
            </div>
        );
    }

    const lesson_outline = predictionsData.lesson_outline;
    const list_of_excellent_guidelines = predictionsData.teaching_guidelines_metrics.list_of_excellent_guidelines;
    const list_of_good_guidelines = predictionsData.teaching_guidelines_metrics.list_of_good_guidelines;
    const list_of_poor_guidelines = predictionsData.teaching_guidelines_metrics.list_of_poor_guidelines;

    return (
        <div className="max-w-4xl mx-auto p-4">
            <Header pageTitle='Lesson Details' />
            <div className='flex items-center mb-8'>
                <ArrowLeft className='cursor-pointer' onClick={() => window.history.back()} />
                <p className='text-lg font-medium px-2'>Back</p>
            </div>
            <div className="mb-12">
                <div className="flex items-center mb-2">
                    <h3 className="text-xl font-semibold text-gray-600 mr-2">Structure</h3>
                    <StarRating value={structureStars} />
                </div>
                <ul className="list-disc pl-5">
                    {lesson_outline.map((item, index) => (
                        <li key={index} className="mb-1">{item}</li>
                    ))}
                </ul>
            </div>
            <div className="flex items-center mb-2">
                <h3 className="text-xl font-semibold text-gray-600 mr-2">Depth</h3>
                <StarRating value={depthStars} />
            </div>
            <div className="mt-4">
                <div className="px-8">
                    {lesson_plan_metrics?.list_of_topics_covered.map((topic, index) => (
                        <div className='mt-2 mb-4'>
                            {getTopicTag(topic)}
                            <p key={index} className="">{topic}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="">
                {(no_of_missed_topics === 0) ? (
                    <></>
                ) : (
                    <div className='mt-6'>
                        <p className="text-md font-semibold mb-2 px-6">Topics For Next Time</p>
                        <div className="px-8">
                            {list_of_missed_topics.map((topic, index) => (
                                <p key={index} className="mt-2 mb-2">{topic}</p>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            <div className="flex items-center mt-12 mb-2">
                <h3 className="text-xl font-semibold text-gray-600 mr-2">Style</h3>
                <StarRating value={styleStars} />
            </div>
            <div className="mt-4">
                <div className="px-8">
                    {list_of_excellent_guidelines.map((guideline, index) => (
                        <div className='mt-2 mb-4'>
                            <p className='text-sm font-semibold text-green-500'>EXCELLENT</p>
                            <p key={index} className="">{guideline}</p>
                        </div>
                    ))}
                </div>
                <div className="px-8">
                    {list_of_good_guidelines.map((guideline, index) => (
                        <div className='mt-2 mb-4'>
                            <p className='text-sm font-semibold text-blue-500'>GOOD</p>
                            <p key={index} className="">{guideline}</p>
                        </div>
                    ))}
                </div>
                <div className="px-8">
                    {list_of_poor_guidelines.map((guideline, index) => (
                        <div className='mt-2 mb-4'>
                            <p className='text-sm font-semibold text-yellow-500'>COULD BE IMPROVED</p>
                            <p key={index} className="">{guideline}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}