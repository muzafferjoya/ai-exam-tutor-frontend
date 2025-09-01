import { useState } from 'react'
import api from '../utils/api'

export default function Onboarding() {
  const [formData, setFormData] = useState({
    email: '',
    exam_type: 'SSC',
    study_hours: 2
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await api.post('/register', formData)
      const user_id = res.data.user_id
      localStorage.setItem('user_id', user_id)
      window.location.href = '/dashboard'
    } catch (err) {
      alert("Registration failed. Try again.")
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">📚 AI Exam Tutor</h1>
        <p className="text-gray-600 text-center mb-6">Prepare for SSC & Railway Exams</p>

        <div className="mb-4">
          <label className="block mb-1">Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={e => setFormData({ ...formData, email: e.target.value })}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Exam Type</label>
          <select
            value={formData.exam_type}
            onChange={e => setFormData({ ...formData, exam_type: e.target.value })}
            className="w-full border p-2 rounded"
          >
            <option value="SSC">SSC</option>
            <option value="Railway">Railway</option>
          </select>
        </div>

        <div className="mb-6">
          <label className="block mb-1">Study Hours Per Day</label>
          <input
            type="number"
            min="1"
            max="12"
            value={formData.study_hours}
            onChange={e => setFormData({ ...formData, study_hours: parseInt(e.target.value) })}
            className="w-full border p-2 rounded"
          />
        </div>

        <button type="submit" className="w-full bg-primary text-white py-2 rounded hover:bg-blue-800">
          Start Learning
        </button>
      </form>
    </div>
  )
}
