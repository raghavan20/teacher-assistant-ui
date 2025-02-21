import React from 'react';
import { Link } from 'react-router-dom';
import AnalysisWidget from '../components/AnalysisWidget';
import type { RecordingAnalysis } from '../types';
import { ArrowLeft } from 'lucide-react';

const mockAnalysis: RecordingAnalysis = {
    r_overall_score: 85,
    r_structure: 4,
    r_depth: 3,
    r_style: 5,
    r_topics_covered: 8,
    r_topics_required: 10,
    r_suggestions_count: 3,
    grade: '3',
    id: 4,
    r_full_response_json: { feedback: '{}' },
    subject: 'Hindi',
    timestamp: new Date().toISOString(),
    user_id: 1,
};

export default function AnalysisPage() {
    const handleShowDetails = () => {
        // Handle showing details
        console.log('Show details clicked');
    };

    return (
        <div className="max-w-4xl mx-auto p-4">
            <div className='absolute top-2 left-2'>
                <Link to="/recordings" className="text-blue-500 hover:underline">
                    <div className='flex gap-1'>
                        <ArrowLeft className='text-blue-500'/> All Lessons
                    </div>
                </Link>
            </div>
            <h1 className="text-2xl font-bold mb-6 mt-6">Analysis</h1>
            <AnalysisWidget analysis={mockAnalysis} onShowDetails={handleShowDetails} />
        </div>
    );
}