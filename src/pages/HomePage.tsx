import React from 'react';
import { useState, useEffect } from 'react';
import { Plus, BookOpenCheck, Star, Flame } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import Header from '../components/Header';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function HomePage() {
  const pageTitle = "My Profile";
  const teacherName = localStorage.getItem('name') || 'Pallavi';
  const [totalLessons, setTotalLessons] = useState<number>(0);
  const [totalStars, setTotalStars] = useState<number>(0);
  const [streakDays, setStreakDays] = useState<number>(0);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchTotalLessons = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/recordings?user_id=${userId}`, {
          method: "GET"
        });
        const data = await response.json();
        if (Array.isArray(data)) {
          setTotalLessons(data.length);
        } else {
          console.error("Unexpected API response format:", data);
          setTotalLessons(0);
        }
      } catch (error) {
        console.error("Error fetching recordings:", error);
      }
    };
    fetchTotalLessons();
    setTotalStars(totalLessons * 6);
    setStreakDays(Math.floor(totalLessons * 0.6));
  }, []);

  const data = {
    labels: ['S', 'M', 'T', 'W', 'Th', 'F', 'Sa'],
    datasets: [
      {
        data: [5, 10, 7, 8, 6, 9, 4], // Replace with dynamic data if available
        backgroundColor: 'rgba(107, 59, 245, 0.9)',
        borderWidth: 1,
        borderRadius: 8,
        barWidth: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
    },
    scales: {
      x: {
        grid: {
          display: true, // Hide grid lines on the x-axis
        },
      },
      y: {
        grid: {
          display: false, // Hide grid lines on the y-axis
        },
      },
    },
  };

  return (
    <div className="max-w-4xl mx-auto p-4 relative">
      <Header pageTitle={pageTitle} />
      <div>
        <p className="text-lg font-medium mt-4 mb-8 px-2">Hi {teacherName}!</p>
      </div>
      <div className="mb-4">
        <div className="w-full flex gap-4">
          <Link to='/recordings' className='w-1/2 bg-white p-4 rounded-lg shadow-md'>
            <div className="bg-white p-1 items-center flex gap-2 justify-center">
              <Star size={24} className="text-center text-yellow-400 fill-current" />
              <p className='text-2xl font-semibold text-center'>{totalStars}</p>
            </div>
            <div className='text-md font-medium text-center'>Stars<br />Earned</div>
          </Link>
          <Link to='/recordings' className='w-1/2 bg-white p-4 rounded-lg shadow-md'>
            <div className="bg-white p-1 items-center flex gap-2 justify-center">
              <BookOpenCheck size={24} className="text-center text-blue-500" />
              <p className='text-2xl font-semibold text-center'>{totalLessons}</p>
            </div>
            <div className='text-md font-medium text-center'>Lessons<br/>Completed</div>
          </Link>
        </div>
      </div>

      <div className="bg-white p-1 rounded-lg shadow-md mb-4">
        <div className='items-center flex gap-2 justify-center mt-4 mb-2'>
          <Flame size={48} className="text-orange-400 fill-current" />
          <p className="text-xl font-semibold">{streakDays} Day Streak!</p>
        </div>
      </div>

      <div className="bg-white p-1 rounded-lg shadow-md mb-4">
        <div className='items-center flex gap-2 justify-center mt-4 mb-2'>
          <Star size={24} className="text-yellow-400 fill-current" />
          <p className="text-lg font-semibold">Stars Earned This Week!</p>
        </div>
        <Bar className='ml-4 mr-4 mt-4' data={data} options={options} />
      </div>

      <Link
        to="/record"
        className="fixed bottom-8 shadow-lg left-1/2 transform -translate-x-1/2 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors justify-center items-center flex"
      >
        <Plus size={64} />
      </Link>
    </div>
  );
}