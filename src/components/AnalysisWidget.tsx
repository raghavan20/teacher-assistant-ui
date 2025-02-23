import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Info, ArrowRight, Share, PlayCircle, FerrisWheel, NotebookPen, X } from 'lucide-react';
import type { RecordingAnalysis } from '../types';
import StarRating from './StarRating.tsx';
import { formatDate, toSentenceCase } from '../utils.tsx';
import DonutChart from './DonutChart.tsx';
import { Link } from 'react-router-dom';

interface AnalysisWidgetProps {
  analysis: RecordingAnalysis;
  onShowDetails: () => void;
}

const textOptions = ["Awesome!", "Great!", "Nice!", "Getting There!"];

export default function AnalysisWidget({ analysis, onShowDetails }: AnalysisWidgetProps) {
  const navigate = useNavigate();
  const [currentText, setCurrentText] = useState(textOptions[0]);
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [textVisible, setTextVisible] = useState(false);
  const [streak, setStreak] = useState(5); // Example streak value
  const [structureStars, setStructureStars] = useState(0); // Example structure value
  const [depthStars, setDepthStars] = useState(0); // Example depth value
  const [styleStars, setStyleStars] = useState(0); // Example style value
  const lessonPlanMetricsData = analysis.r_full_response_json.predictions.lesson_plan_metrics;
  const suggestionsData = analysis.r_full_response_json.suggestions;

  useEffect(() => {
    let selectedText = textOptions[3]; // Default to "Getting There!"
    if (analysis.r_overall_score >= 90) {
      selectedText = textOptions[0]; // "Awesome!"
    } else if (analysis.r_overall_score >= 75) {
      selectedText = textOptions[1]; // "Great!"
    } else if (analysis.r_overall_score >= 50) {
      selectedText = textOptions[2]; // "Nice!"
    }
    setCurrentText(selectedText);

    if (analysis.r_structure >= 75) {
      setStructureStars(3);
    } else if (analysis.r_structure >= 50) {
      setStructureStars(2);
    } else if (analysis.r_structure >= 25) {
      setStructureStars(1);
    } else {
      setStructureStars(0);
    }

    if (analysis.r_depth >= 75) {
      setDepthStars(3);
    } else if (analysis.r_depth >= 50) {
      setDepthStars(2);
    } else if (analysis.r_depth >= 25) {
      setDepthStars(1);
    } else {
      setDepthStars(0);
    }

    if (analysis.r_style >= 75) {
      setStyleStars(3);
    } else if (analysis.r_style >= 50) {
      setStyleStars(2);
    } else if (analysis.r_style >= 25) {
      setStyleStars(1);
    } else {
      setStyleStars(0);
    }

    // Set a timeout to show the text after the DonutChart animation is complete
    const timeout = setTimeout(() => {
      setTextVisible(true);
    }, 1000); // 1000ms matches the duration of the DonutChart animation

    return () => clearTimeout(timeout);
  }, [analysis.r_overall_score]);

  return (
    <div className="relative">
      <div className="absolute top-2 right-2 flex items-center space-x-2">
        <button
          onClick={() => setShowShareDialog(true)}
          className="p-2 bg-gray-100 rounded-full hover:bg-gray-300 transition-colors"
        >
          <PlayCircle size={24} />
        </button>
        <button
          onClick={() => setShowShareDialog(true)}
          className="p-2 bg-gray-100 rounded-full hover:bg-gray-300 transition-colors"
        >
          <Share size={24} />
        </button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <p className="text-lg font-semibold text-gray-800">{toSentenceCase(analysis.subject)} - Grade {analysis.grade}</p>
          <p className="text-sm font-regular text-gray-400">{formatDate(analysis.timestamp)}</p>
        </div>
        {/* Widget A: Overall Score */}
        <button
          onClick={() => console.log('Navigate to new page')}
          className="col-span-2 bg-white p-6 rounded-lg shadow-md relative text-left"
        >
          <h3 className="text-lg font-semibold mb-4">Your Lesson</h3>
          <div className='flex gap-4'>
            <div className="flex justify-between items-center">
              <DonutChart percentage={analysis.r_overall_score} />
            </div>
            <div className="flex flex-col items-center">
              <div className={`text-2xl text-center font-bold text-black-500 transition-all duration-1000 ${textVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}>
                {currentText}
              </div>
              <div className="mt-4 mb-4 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-gray-600 mr-2">Structure</span>
                  <StarRating value={structureStars} />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-gray-600 mr-2">Depth</span>
                  <StarRating value={depthStars} />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-gray-600 mr-2">Style</span>
                  <StarRating value={styleStars} />
                </div>
              </div>
            </div>
          </div>

          <ArrowRight className="absolute bottom-2 right-2 text-gray-400" size={24} />
        </button>

        {/* Widget B: Topics */}
        <Link
          to={'/recordings/' + analysis.id + '/topics'} state={{ lessonPlanMetricsData }}
          className="bg-white p-6 rounded-lg shadow-md relative text-left"
        >
          <h3 className="text-lg font-semibold mb-2">Topics</h3>
          <div className='flex gap-4 justify-center items-center'>
            <div className="text-6xl font-bold text-center">
              {analysis.r_topics_covered}
            </div>
            <div>
              <div className='text-xl font-bold text-center'>out of</div>
              <div className='text-xl font-bold text-center'>{analysis.r_topics_required}</div>
            </div>
          </div>
          <p className="text-sm text-gray-600 text-center mt-2">Topics Covered</p>
          <ArrowRight className="absolute bottom-2 right-2 text-gray-400" size={24} />
        </Link>

        {/* Widget C: Suggestions */}
        <Link
          to={'/recordings/' + analysis.id + '/suggestions'} state={{ suggestionsData }}
          className="bg-white p-6 rounded-lg shadow-md relative text-left"
        >
          <h3 className="text-lg font-semibold mb-2">Feedback</h3>
          <div className="text-6xl font-bold text-center">
            {analysis.r_suggestions_count}
          </div>
          <p className="text-sm text-gray-600 text-center mt-2">Suggestions</p>
          <ArrowRight className="absolute bottom-2 right-2 text-gray-400" size={24} />
        </Link>

        {/* Widget D: Generate Quiz */}
        <div className="col-span-2 flex flex-col items-center justify-center text-center mt-4">
          <Link className="w-3/4 my-2 py-4 bg-purple-500 text-white rounded-md shadow-lg hover:bg-purple-600 flex items-center justify-center gap-2 transition-colors"
          to={`/recordings/${analysis.id}/activity`}>
            <FerrisWheel size={24} />
            <span>Suggest Fun Activity!</span>
          </Link>
          <Link className="w-3/4 my-2 py-4 bg-pink-500 text-white rounded-md shadow-lg hover:bg-pink-600 flex items-center justify-center gap-2 transition-colors"
            to={`/recordings/${analysis.id}/quiz`}>
            <NotebookPen size={24} />
            <span>Generate Quiz</span>
          </Link>
        </div>
      </div>
      {showShareDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-3/4 relative bg-gray-300 p-6 rounded-lg shadow-md mx-2">
            <div className="absolute top-2 right-2">
              <X size={24} onClick={() => setShowShareDialog(false)} />
            </div>
            <p className="text-2xl text-center font-semibold mt-2 mb-2">Share Via:</p>
            <div className="flex items-center justify-center px-8 mt-4 gap-4">
              <img src="/src/assets/wa.png" className="mx-auto w-12 h-12" />
              <img src="/src/assets/fb.png" className="mx-auto w-12 h-12" />
              <img src="/src/assets/insta.png" className="mx-auto w-14 h-14" />
              <img src="/src/assets/email.png" className="mx-auto w-11 h-11" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}