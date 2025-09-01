import { useEffect, useState } from 'react'
import api from '../utils/api'

export default function Progress() {
  const [data, setData] = useState(null)
  const user_id = localStorage.getItem('user_id')

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const res = await api.get(`/progress/${user_id}`)
        setData(res.data)
      } catch (err) {
        alert("Failed to load progress.")
      }
    }
    if (user_id) fetchProgress()
  }, [user_id])

  if (!data) return <div className="p-6 text-center">Loading progress...</div>

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">📈 Your Progress</h1>

      <div className="bg-white p-6 rounded-lg shadow text-center">
        <div className="flex items-center justify-center mb-4">
          <span className="text-4xl">🔥</span>
          <span className="ml-2 text-2xl font-bold">{data.streak}</span>
        </div>
        <p className="text-gray-600">Day Streak</p>

        <div className="mt-6">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-secondary h-2.5 rounded-full"
              style={{ width: `${data.accuracy}%` }}
            ></div>
          </div>
          <p className="mt-2 font-semibold">{data.accuracy}% Accuracy</p>
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded">
          <p><strong>Total Quizzes:</strong> {data.quizzes_attempted}</p>
        </div>
      </div>
    </div>
  )
}
