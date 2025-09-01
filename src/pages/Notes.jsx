import { useState } from 'react'
import api from '../utils/api'

export default function Notes() {
  const [topic, setTopic] = useState('')
  const [notes, setNotes] = useState(null)
  const [lang, setLang] = useState('english') // 'english' or 'hindi'
  const [loading, setLoading] = useState(false)

  const generateNotes = async () => {
    if (!topic.trim()) return
    setLoading(true)
    try {
      const res = await api.post('/notes', { topic })
      setNotes(res.data)
    } catch (err) {
      alert("Failed to generate notes. Try again.")
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(notes[lang])
    alert("Copied to clipboard!")
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">📘 AI Notes Generator</h1>

      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="e.g., History – Revolt of 1857"
          className="w-full border p-2 rounded mb-4"
        />
        <button
          onClick={generateNotes}
          disabled={loading}
          className="bg-primary text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {loading ? "Generating..." : "Generate Notes"}
        </button>
      </div>

      {notes && (
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex flex-wrap items-center justify-between mb-4 gap-2">
            <h3 className="font-bold text-lg">Notes: {topic}</h3>
            <div className="flex gap-2">
              <button
                onClick={() => setLang('english')}
                className={`px-3 py-1 rounded text-sm ${lang === 'english' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
              >
                English
              </button>
              <button
                onClick={() => setLang('hindi')}
                className={`px-3 py-1 rounded text-sm ${lang === 'hindi' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
              >
                हिंदी
              </button>
              <button onClick={copyToClipboard} className="text-blue-600 text-sm underline">
                Copy
              </button>
            </div>
          </div>

          <div className="p-4 bg-gray-50 rounded border-l-4 border-primary min-h-32">
            <p className="whitespace-pre-line leading-relaxed">
              {notes[lang]}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
