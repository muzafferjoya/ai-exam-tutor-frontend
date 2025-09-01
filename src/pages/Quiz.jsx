import { useState } from 'react'
import api from '../utils/api'

export default function Quiz() {
  const [topic, setTopic] = useState('')
  const [quiz, setQuiz] = useState(null)
  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState([])
  const [showResult, setShowResult] = useState(false)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const generateQuiz = async () => {
    if (!topic.trim()) return
    setLoading(true)
    try {
      const res = await api.post('/quiz', { topic })
      setQuiz(res.data.questions)
      setAnswers(Array(res.data.questions.length).fill(-1))
    } catch (err) {
      alert("Failed to generate quiz.")
    } finally {
      setLoading(false)
    }
  }

  const submitQuiz = async () => {
    const user_id = localStorage.getItem('user_id')
    try {
      const res = await api.post('/quiz/submit', { user_id, answers })
      setResult(res.data)
      setShowResult(true)
    } catch (err) {
      alert("Failed to submit quiz.")
    }
  }

  if (showResult) {
    return (
      <div className="p-6 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">🎉 Quiz Complete!</h1>
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-xl mb-4">
            Score: {result.score}/{result.total} ({result.percentage}%)
          </p>
          <h3 className="font-bold mt-4">Explanations:</h3>
          {result.explanations.map((exp, i) => (
            <div key={i} className="mt-2 p-3 bg-gray-100 rounded">
              <strong>Q{i+1}:</strong> {exp}
            </div>
          ))}
          <button
            onClick={() => window.location.href = '/dashboard'}
            className="mt-6 bg-primary text-white px-4 py-2 rounded"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">🧠 AI Quiz Generator</h1>

      {!quiz ? (
        <>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g., Profit & Loss"
            className="w-full border p-2 rounded mb-4"
          />
          <button
            onClick={generateQuiz}
            disabled={loading}
            className="bg-primary text-white px-4 py-2 rounded disabled:opacity-50"
          >
            {loading ? "Generating..." : "Generate Quiz"}
          </button>
        </>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="mb-4">
            <strong>Question {currentQ + 1} of {quiz.length}</strong>
          </div>
          <h3 className="text-lg mb-4">{quiz[currentQ].question}</h3>
          {quiz[currentQ].options.map((opt, i) => (
            <div key={i} className="mb-2">
              <label>
                <input
                  type="radio"
                  checked={answers[currentQ] === i}
                  onChange={() => {
                    const newAns = [...answers]
                    newAns[currentQ] = i
                    setAnswers(newAns)
                  }}
                /> {String.fromCharCode(65 + i)}. {opt}
              </label>
            </div>
          ))}

          <div className="flex justify-between mt-6">
            <button
              onClick={() => setCurrentQ(q => Math.max(0, q - 1))}
              disabled={currentQ === 0}
              className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
            >
              Previous
            </button>
            {currentQ === quiz.length - 1 ? (
              <button
                onClick={submitQuiz}
                className="px-4 py-2 bg-green-600 text-white rounded"
              >
                Submit
              </button>
            ) : (
              <button
                onClick={() => setCurrentQ(q => q + 1)}
                className="px-4 py-2 bg-primary text-white rounded"
              >
                Next
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
