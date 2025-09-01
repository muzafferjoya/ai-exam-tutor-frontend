import { useEffect, useState } from 'react'
import api from '../utils/api'

export default function Dashboard() {
  const [plan, setPlan] = useState('')
  const user_id = localStorage.getItem('user_id')

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const res = await api.get(`/study-plan/${user_id}`)
        setPlan(res.data.study_plan)
      } catch (err) {
        alert("Failed to load study plan")
      }
    }
    if (user_id) fetchPlan()
  }, [user_id])

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">🎯 Today’s Study Plan</h1>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="font-semibold text-lg mb-2">Your AI Plan</h2>
        <p className="text-gray-700 whitespace-pre-line">{plan}</p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4">
  <button
    onClick={() => (window.location.href = '/notes')}
    className="p-4 bg-blue-100 rounded text-left hover:bg-blue-200"
  >
    📝 Generate Notes
  </button>
  <button
    onClick={() => (window.location.href = '/quiz')}
    className="p-4 bg-green-100 rounded text-left hover:bg-green-200"
  >
    🧠 Take Quiz
  </button>
  <button
    onClick={() => (window.location.href = '/progress')}
    className="p-4 bg-yellow-100 rounded text-left hover:bg-yellow-200"
  >
    📊 View Progress
  </button>
</div>
    </div>
  )
}
