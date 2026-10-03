import { useState } from "react";
import type { FormEvent }
from "react";
import { useNavigate } from "react-router-dom";

interface QuizOption
{
    id: string;
  text: string;
}

interface QuizQuestion
{
    id: string;
  prompt: string;
  options: QuizOption[];
  correctOptionId: string;
}

interface QuizDraft
{
    title: string;
  description: string;
  questions: QuizQuestion[];
}

const makeOption = (): QuizOption => ({
id: `option -${ Date.now()}
    -${ Math.random().toString(36).slice(2)}`,
  text: "",
});

const makeQuestion = (): QuizQuestion => ({
id: `question -${ Date.now()}
    -${ Math.random().toString(36).slice(2)}`,
  prompt: "",
  options: [makeOption(), makeOption()],
  correctOptionId: "",
});

const makeQuiz = (): QuizDraft => ({
title: "",
  description: "",
  questions: [makeQuestion()],
});

const CreateQuiz = () =>
{
const navigate = useNavigate();
const [step, setStep] = useState < 1 | 2 > (1);
const [quiz, setQuiz] = useState<QuizDraft>(makeQuiz);
const [error, setError] = useState("");
const [message, setMessage] = useState("");

const updateQuestion = (
  questionId: string,
  changes: Partial<QuizQuestion>
) => {
    setQuiz((current) => ({
        ...current,
      questions: current.questions.map((question) =>
        question.id === questionId
          ? { ...question, ...changes }
          : question
      ),
    }));
  };

const goToQuestions = () =>
{
    if (!quiz.title.trim())
    {
        setError("Enter a quiz title before continuing.");
        return;
    }

    setError("");
    setStep(2);
};

const addQuestion = () =>
{
    setQuiz((current) => ({
        ...current,
      questions: [...current.questions, makeQuestion()],
    }));
    setError("");
};

const removeQuestion = (questionId: string) => {
    setQuiz((current) => ({
      ...current,
    questions: current.questions.filter(
      (question) => question.id !== questionId
    ),
    }));
  };

const addOption = (question: QuizQuestion) => {
    updateQuestion(question.id, {
      options: [...question.options, makeOption()],
    });
  };

const updateOption = (
  question: QuizQuestion,
  optionId: string,
  text: string
) => {
    updateQuestion(question.id, {
      options: question.options.map((option) =>
        option.id === optionId ? { ...option, text } : option
      ),
    });
  };

const removeOption = (question: QuizQuestion, optionId: string) => {
    if (question.options.length <= 2) return;

const options = question.options.filter(
  (option) => option.id !== optionId
);

const correctOptionId =
  question.correctOptionId === optionId
    ? ""
    : question.correctOptionId;

updateQuestion(question.id, { options, correctOptionId });
  };

const saveQuiz = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setMessage("");

    if (!quiz.title.trim())
    {
        setStep(1);
        setError("Enter a quiz title.");
        return;
    }

    const incompleteQuestion = quiz.questions.findIndex(
      (question) =>
        !question.prompt.trim() ||
        question.options.some((option) => !option.text.trim()) ||
        !question.options.some(
          (option) => option.id === question.correctOptionId
        )
    );

    if (incompleteQuestion !== -1)
    {
        setError(
        `Complete Question ${ incompleteQuestion + 1}: add the prompt and options, then select the correct answer.`
      );
        return;
    }

    const draft = {
      ...quiz,
      title: quiz.title.trim(),
      description: quiz.description.trim(),
    }
;

// UI-only for now. Connect this draft to your API when you're ready.
console.info("Quiz draft:", draft);
setMessage("Your quiz draft is ready.");
  };

return (

  < main className = "mx-auto max-w-5xl p-4 md:p-8" >

    < button
        type = "button"
        onClick ={ () => navigate("/admin/quizzes")}
className = "mb-5 text-sm text-gray-600 hover:text-purple-700"
>
        ← Back to All Quizzes
      </button>

      <div className="mb-7">
        <p className="text-sm font-semibold uppercase tracking-wide text-purple-600">
          Quiz Management
        </p>
        <h1 className="mt-1 text-2xl font-bold text-gray-900">Create Quiz</h1>
        <p className="mt-2 text-sm text-gray-500">
          Add the quiz details, then create questions and answer options.
        </p>
      </div>

      <div className="mb-6 flex items-center gap-3">
        <div
          className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold ${
            step === 1
              ? "bg-purple-600 text-white"
              : "bg-purple-100 text-purple-700"
          }`}
        >
          1
        </ div >
        < span className ={ step === 1 ? "font-semibold text-gray-900" : "text-gray-500"}>
          Quiz details
        </ span >
        < div className = "h-px w-10 bg-gray-300" />
        < div
          className ={`flex h-8 w - 8 items - center justify - center rounded - full text - sm font - semibold ${
        step === 2
          ? "bg-purple-600 text-white"
          : "bg-gray-200 text-gray-500"
          }`}
        >
          2
        </ div >
        < span className ={ step === 2 ? "font-semibold text-gray-900" : "text-gray-500"}>
          Questions
        </ span >
      </ div >

      < form
        onSubmit ={ saveQuiz}
className = "rounded-xl border border-gray-200 bg-white p-5 shadow-sm md:p-7"
>
        {
    step === 1 ? (
          < section >
            < h2 className = "text-lg font-semibold text-gray-900" >
              Quiz details
            </ h2 >
            < p className = "mt-1 text-sm text-gray-500" >
              Start with a title and a short description.
            </ p >

            < label className = "mt-6 block" >
              < span className = "mb-2 block text-sm font-medium text-gray-700" >
                Quiz title<span className = "text-red-500" > *</ span >
              </ span >
              < input
                value ={ quiz.title}
    onChange ={
        (event) => {
            setQuiz((current) => ({
                ...current,
                    title: event.target.value,
                  }));
            setError("");
        }
    }
    placeholder = "e.g. JavaScript Fundamentals"
                maxLength ={ 100}
    className = "w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
  />

</ label >


< label className = "mt-5 block" >

  < span className = "mb-2 block text-sm font-medium text-gray-700" >
    Description < span className = "font-normal text-gray-400" > (optional) </ span >

  </ span >

  < textarea
                value ={ quiz.description}
    onChange ={
        (event) =>
                  setQuiz((current) => ({
            ...current,
                    description: event.target.value,
                  }))
                }
    placeholder = "What is this quiz about?"
                rows ={ 4}
    maxLength ={ 300}
    className = "w-full resize-y rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
  />

</ label >

            {
        error && (
              < p role = "alert" className = "mt-4 text-sm text-red-600" >
                { error}
              </ p >
            )}

            < div className = "mt-7 flex justify-end" >
              < button
                type = "button"
                onClick ={ goToQuestions}
    className = "rounded-md bg-purple-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-purple-700"
  >
    Next: Questions
  </ button >

</ div >

</ section >
        ) : (
          < section >
            < div className = "mb-6 flex flex-wrap items-start justify-between gap-3" >
              < div >
                < h2 className = "text-lg font-semibold text-gray-900" >
                  Questions and options
                </ h2 >
                < p className = "mt-1 text-sm text-gray-500" >
                  Add at least two options and select the correct answer for each question.
                </ p >
              </ div >
              < span className = "rounded-full bg-purple-50 px-3 py-1 text-xs font-medium text-purple-700" >
                { quiz.questions.length}
    { " "}
    { quiz.questions.length === 1 ? "question" : "questions"}
              </ span >
            </ div >

            < div className = "space-y-5" >
              {
        quiz.questions.map((question, questionIndex) => (
                < article
                  key ={ question.id}
        className = "rounded-lg border border-gray-200 p-4 md:p-5"
      >

        < div className = "mb-4 flex items-center justify-between" >

          < h3 className = "font-semibold text-gray-800" >
            Question { questionIndex + 1}
                    </ h3 >
                    < button
                      type = "button"
                      onClick ={ () => removeQuestion(question.id)}
        disabled ={ quiz.questions.length === 1}
        className = "text-sm text-red-600 hover:text-red-700 disabled:cursor-not-allowed disabled:text-gray-300"
      >
        Remove
      </ button >

    </ div >


    < label className = "block" >

      < span className = "mb-2 block text-sm font-medium text-gray-700" >
        Question prompt
      </ span >

      < textarea
                      value ={ question.prompt}
        onChange ={
            (event) =>
                        updateQuestion(question.id, {
            prompt: event.target.value,
                        })
                      }
        placeholder = "Write your question..."
                      rows ={ 2}
        className = "w-full resize-y rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
      />

    </ label >


    < div className = "mt-5" >

      < p className = "mb-1 text-sm font-medium text-gray-700" >
        Answer options
      </ p >

      < p className = "mb-3 text-xs text-gray-500" >
        Select the circle beside the correct answer.
                    </ p >

                    < div className = "space-y-2" >
                      {
            question.options.map((option, optionIndex) => (
                        < div
                          key ={ option.id}
            className = "flex items-center gap-3"
          >

            < input
                            type = "radio"
                            name ={ question.id}
            checked={ question.correctOptionId === option.id}
            onChange ={
                () =>
              updateQuestion(question.id, {
                correctOptionId: option.id,
                              })
                            }
            aria - label ={`Mark option ${ optionIndex + 1} as correct`}
            className = "h-4 w-4 accent-purple-600"
          />

          < span className = "w-5 text-xs font-semibold text-gray-500" >
                            { String.fromCharCode(65 + optionIndex)}
                          </ span >
                          < input
                            value ={ option.text}
            onChange ={
                (event) =>
                              updateOption(question, option.id, event.target.value)
                            }
            placeholder ={`Option ${ optionIndex + 1}`}
            aria - label ={`Question ${ questionIndex + 1}, option ${ optionIndex + 1}`}
            className = "min-w-0 flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
          />

          < button
                            type = "button"
                            onClick ={ () => removeOption(question, option.id)}
            disabled ={ question.options.length <= 2}
            aria - label ={`Remove option ${ optionIndex + 1}`}
            className = "px-1 text-xl leading-none text-gray-400 hover:text-red-600 disabled:cursor-not-allowed disabled:text-gray-200"
          >
                            ×
                          </ button >
                        </ div >
                      ))}
                    </ div >

                    < button
                      type = "button"
                      onClick ={ () => addOption(question)}
            className = "mt-3 text-sm font-medium text-purple-700 hover:text-purple-800"
          >
            +Add option
          </ button >

        </ div >

      </ article >
              ))}
            </ div >

            < button
              type = "button"
              onClick ={ addQuestion}
        className = "mt-5 w-full rounded-lg border border-dashed border-purple-300 py-3 text-sm font-semibold text-purple-700 hover:bg-purple-50"
      >
        +Add question
      </ button >

            {
            error && (
              < p role = "alert" className = "mt-4 text-sm text-red-600" >
                { error}
              </ p >
            )}

        {
            message && (

          < p role = "status" className = "mt-4 rounded-md bg-green-50 p-3 text-sm text-green-700" >
                { message}
              </ p >
            )}

            < div className = "mt-7 flex flex-wrap justify-between gap-3 border-t border-gray-200 pt-5" >
              < button
                type = "button"
                onClick ={
            () =>
            {
                setStep(1);
                setError("");
                setMessage("");
            }}
        className = "rounded-md border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
      >
        Back to details
      </ button >

      < button
                type = "submit"
                className = "rounded-md bg-purple-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-purple-700"
              >
                Save Quiz
              </ button >
            </ div >
          </ section >
        )}
      </ form >
    </ main >
  );
}
;

export default CreateQuiz;