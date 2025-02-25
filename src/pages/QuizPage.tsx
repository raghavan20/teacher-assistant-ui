import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ArrowLeft, Share } from 'lucide-react';
import Header from '../components/Header.tsx';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function QuizPage() {
  const { recordingId } = useParams();
  const [quiz, setQuiz] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchQuiz() {
      
      try {
        const response = await fetch(`${API_BASE_URL}/recordings/${recordingId}/quiz`, {
          method: "POST"
        });
        const data = await response.json();
        if (Array.isArray(data)) {
          setQuiz(data);
        } else {
          console.error("Unexpected API response format:", data);
          setQuiz([]);
        }
      } catch (error) {
        console.error("Error fetching quiz:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchQuiz();
  }, [recordingId]);

  if (loading) {
    return (
      <div className="min-h-screen px-4 py-4 flex flex-col">
        <div className="justify-center items-center py-32 my-auto">
          <img src='/src/assets/analyze.gif' alt="Loading..." className="mx-auto" />
          <p className="text-4xl text-gray-800 text-center my-8 animate-bounce">Generating<br></br>Quiz!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Header pageTitle="Quiz" />
      <div className='flex justify-between mb-8'>
        <div className='flex items-center gap-2'>
          <ArrowLeft className='cursor-pointer' onClick={() => window.history.back()} />
          <p className='text-lg font-medium px-2'>Back</p>
        </div>
        <div className='mr-4'>
          <button
            className="p-2 right-2 bg-gray-100 rounded-full hover:bg-gray-300 transition-colors"
          >
            <Share size={24} />
          </button>
        </div>
      </div>
      {quiz.map((item, index) => (
        <div key={index} className="px-6 mb-12">
          <p className="text-md font-semibold mb-4">{item.question}</p>
          <ul className="mt-2">
            {Array.isArray(item.options) && item.options.map((option, i) => (
              <div className='flex gap-2 my-2'>
                <a key={i} className='text-sm pl-4'>{i + 1}.</a>
                <a className='text-sm pl-2'>{option}</a>
              </div>
            ))}
          </ul>
          <p className='text-sm font-semibold mt-4'>
            Answer: {item.answer}
          </p>
        </div>
      ))}
    </div>
  );
}