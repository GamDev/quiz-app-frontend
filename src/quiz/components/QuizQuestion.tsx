import type { Question } from "../models/Question";

interface QuestionProps {
  question: Question;
}

function QuizQuestion({ question }: QuestionProps) {
  return (
    <div>
      <h1>{question.text}</h1>
      {question.options.map((opt) => (
        <div>
          <span>{opt.id}</span>
          <span>{opt.text}</span>
        </div>
      ))}
    </div>
  );
}
export default QuizQuestion;
