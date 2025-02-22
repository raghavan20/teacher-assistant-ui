import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Header from '../components/Header';

const activityData = {
  "activity": [
    {
      "activity_name": "Village Market Simulation",
      "description": "Divide the class into groups representing different vendors in a village market (e.g., vegetable seller, grain seller, tailor, potter). Each group uses the provided materials to create 'products' to sell. Students then engage in a simulated market, buying and selling goods using pebbles as currency. This activity helps them understand basic economic concepts like supply, demand, pricing, and trade.",
      "material_needed": "Small stones or pebbles, leaves, twigs, empty matchboxes, paper scraps, pens/pencils, chart paper (optional), string or rope (optional)"
    },
    {
      "activity_name": "Needs vs. Wants Discussion & Chart",
      "description": "Begin with a class discussion about the difference between needs (essential for survival) and wants (things we desire but aren't essential). Ask students to provide examples from their own lives. Create a chart with two columns: 'Needs' and 'Wants'. Have students contribute items to each column. Optionally, use pictures to illustrate the items. This activity reinforces the concept of scarcity and resource allocation.",
      "material_needed": "Chart paper or large slate, chalk or marker, pictures cut from old magazines or drawn by students (optional)"
    },
    {
      "activity_name": "Story of a Rupee",
      "description": "Tell a story about a single rupee coin and how it travels through different people in the village (e.g., farmer, shopkeeper, teacher, tailor). Describe how each person uses the rupee and how it benefits them. After the story, discuss the concept of money circulation and its importance in the local economy. Students can then create their own short stories or draw pictures illustrating the journey of a rupee.",
      "material_needed": "One Rupee coin or a picture of one, chart paper or blackboard, chalk or marker."
    }
  ],
  "recording_id": 1
};

export default function ActivityPage() {
  const { activity } = activityData;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Header pageTitle='Activity' />
      <div className='flex items-center mb-8'>
        <ArrowLeft className='cursor-pointer' onClick={() => window.history.back()} />
        <p className='text-lg font-medium px-2'>Back</p>
      </div>
      {activity.map((act, index) => (
        <div key={index} className="mb-12">
          <h2 className="text-xl font-bold mb-2">{act.activity_name}</h2>
          <p className="text-md mb-2">{act.description}</p>
          <p className="text-md font-semibold">Materials Needed:</p>
          <p className="text-md mb-4">{act.material_needed}</p>
        </div>
      ))}
    </div>
  );
}