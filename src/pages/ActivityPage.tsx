import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ArrowLeft, Share } from 'lucide-react';
import Header from '../components/Header.tsx';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function ActivityPage() {
  const { recordingId } = useParams();
  const [activityData, setActivityData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchActivity() {
      console.log('recording_id:', recordingId)
      try {
        const response = await fetch(`${API_BASE_URL}/recordings/${recordingId}/activity`, {
          method: "POST"
        });
        const data = await response.json();
        if (Array.isArray(data)) {
          setActivityData(data[0]);
        } else {
          setActivityData(data);
        }
      } catch (error) {
        console.error("Error fetching activity:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchActivity();
  }, [recordingId]);

  if (loading) {
    return (
      <div className="min-h-screen px-4 py-4 flex flex-col">
        <div className="justify-center items-center py-32 my-auto">
          <img src='/assets/analyze.gif' alt="Loading..." className="mx-auto" />
          <p className="text-4xl text-gray-800 text-center my-8 animate-bounce">Generating a<br></br>Fun Activity!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Header pageTitle='Activity' />
      <div className='flex items-center mb-8'>
        <ArrowLeft className='cursor-pointer' onClick={() => window.history.back()} />
        <p className='text-lg font-medium px-2'>Back</p>
      </div>
      <div className="mb-12">
        <h2 className="text-xl font-bold mb-2">{activityData.activity_name}</h2>
        <p className="text-md mb-2">{activityData.description}</p>
        <p className="text-md font-semibold">Materials Needed:</p>
        <p className="text-md mb-4">{activityData.material_needed}</p>
      </div>
    </div>
  );
}