import React from 'react';
import Header from '../components/Header';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const quizData = {
  "quiz": {
    "answers": [
      { "answer_option": "B", "question_id": 1 },
      { "answer_option": "B", "question_id": 2 },
      { "answer_option": "C", "question_id": 3 },
      { "answer_option": "B", "question_id": 4 },
      { "answer_option": "B", "question_id": 5 }
    ],
    "questions": [
      {
        "options": [
          { "option_id": "A", "text": "Seasonal unemployment" },
          { "option_id": "B", "text": "Disguised unemployment" },
          { "option_id": "C", "text": "Frictional unemployment" },
          { "option_id": "D", "text": "Structural unemployment" }
        ],
        "question": "A farmer in a village has a small plot of land. He grows rice, but the yield is very low due to lack of irrigation. Which of the following is the MOST likely type of unemployment he faces?",
        "question_id": 1
      },
      {
        "options": [
          { "option_id": "A", "text": "Primary sector" },
          { "option_id": "B", "text": "Secondary sector" },
          { "option_id": "C", "text": "Tertiary sector" },
          { "option_id": "D", "text": "Quaternary sector" }
        ],
        "question": "A local weaver in a village uses a handloom to make clothes. Which sector of the Indian economy does this activity primarily belong to?",
        "question_id": 2
      },
      {
        "options": [
          { "option_id": "A", "text": "Low interest rates" },
          { "option_id": "B", "text": "Simple documentation process" },
          { "option_id": "C", "text": "High interest rates and potential exploitation" },
          { "option_id": "D", "text": "Availability of collateral-free loans" }
        ],
        "question": "Many families in rural India depend on moneylenders for loans. What is the MOST significant disadvantage of borrowing from moneylenders?",
        "question_id": 3
      },
      {
        "options": [
          { "option_id": "A", "text": "A privately owned grocery store" },
          { "option_id": "B", "text": "A government-run primary school" },
          { "option_id": "C", "text": "A farmer selling vegetables in the market" },
          { "option_id": "D", "text": "A private doctor's clinic" }
        ],
        "question": "Which of the following is the BEST example of a public sector activity in a village?",
        "question_id": 4
      },
      {
        "options": [
          { "option_id": "A", "text": "Increased dependence on moneylenders" },
          { "option_id": "B", "text": "Empowerment through financial independence" },
          { "option_id": "C", "text": "Reduced access to formal banking services" },
          { "option_id": "D", "text": "Decreased participation in community activities" }
        ],
        "question": "A Self-Help Group (SHG) in a village pools the savings of its members to provide small loans. What is the MAIN benefit of SHGs for rural women?",
        "question_id": 5
      }
    ]
  },
  "recording_id": 1
};

export default function QuizPage() {
  const { questions, answers } = quizData.quiz;

  return (
    <div className="max-w-4xl mx-auto p-4">
    <Header pageTitle='Quiz' />
        <Link className='flex items-center mb-8 middle' to='../'>
            <ArrowLeft className='left-4 cursor-pointer' onClick={() => window.history.back()} />
            <p className='text-lg font-medium px-2'>Back</p>
        </Link>
      {questions.map((question) => (
        <div key={question.question_id} className="mb-12">
          <p className="text-md font-semibold mb-2">{question.question}</p>
          <ul className="list-disc pl-5">
            {question.options.map((option) => (
              <li key={option.option_id} className="mb-1">
                <span className="font-medium text-sm">{option.option_id}:</span> {option.text}
              </li>
            ))}
          </ul>
          <p className="mt-2 text-green-600">
            Correct Answer: {answers.find((answer) => answer.question_id === question.question_id)?.answer_option}
          </p>
        </div>
      ))}
    </div>
  );
}