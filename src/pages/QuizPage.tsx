
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Header from '../components/Header.tsx';


export default function QuizPage() {
  const { recordingId } = useParams();
  const [quiz, setQuiz] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchQuiz() {
      try {
        const response = await fetch(`http://localhost:5000/recordings/${recordingId}/quiz`, {
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

  if (loading) return <CircularProgress className="block mx-auto my-10" />;
  if (quiz.length === 0) return <Typography variant="h6" className="text-center">No quiz questions available.</Typography>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Header pageTitle="Lesson Analysis" />
      <Typography variant="h4" gutterBottom>
        Quiz
      </Typography>
      {quiz.map((item, index) => (
        <Card key={index} sx={{ mb: 2, p: 2 }}>
          <CardHeader title={item.question || "Question not available"} />
          <CardContent>
            <div className="mt-2">
              {Array.isArray(item.options) && item.options.map((option, i) => (
                <Typography key={i} variant="body1">• {option}</Typography>
              ))}
            </div>
            <Typography variant="subtitle1" sx={{ mt: 2, fontWeight: "bold" }}>
              Answer: {item.answer}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}