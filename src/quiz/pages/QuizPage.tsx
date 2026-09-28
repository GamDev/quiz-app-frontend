import QuizQuestion from "../components/QuizQuestion";
import type { Quiz } from "../models/Quiz";

function QuizPage() {
  const quiz: Quiz = {
    title: "General Knowledge",
    questions: [
      {
        id: "1",
        text: "What is the capital of New Zealand?",
        options: [
          { id: "1", text: "Wellington", isCorrect: true },
          { id: "2", text: "Auckland", isCorrect: false },
          { id: "3", text: "Dunedin", isCorrect: false },
        ],
      },
      {
        id: "2",
        text: "What is 2 + 2?",
        options: [
          { id: "1", text: "3", isCorrect: false },
          { id: "2", text: "4", isCorrect: true },
          { id: "3", text: "5", isCorrect: false },
        ],
      },
    ],
  };

  return (
    <div>
      <h1>{quiz.title}</h1>
      {quiz.questions.map((q) => (
        <QuizQuestion question={q}></QuizQuestion>
      ))}
    </div>
  );
}
export default QuizPage;
