'use client'

import { useEffect, useState } from 'react'

type Task = {
  id: number
  title: string
  completed?: boolean
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [title, setTitle] = useState("")
  const API = process.env.NEXT_PUBLIC_API_URL

  useEffect(() => {
    fetch(`${API}/tasks`)
      .then(res => res.json())
      .then(data => setTasks(data))
      .catch(err => console.error("Error fetching tasks:", err))
  }, [API])

  const addTask = async () => {
    if (!title.trim()) return
    const res = await fetch(`${API}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title })
    })
    const data = await res.json()
    setTasks([...tasks, data])
    setTitle("")
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-12">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">DevTask Manager</h1>

      <div className="flex gap-2 mb-6">
        <input 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task"
          className="border rounded px-3 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button 
          onClick={addTask}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Add
        </button>
      </div>

      <ul className="bg-white shadow-md rounded p-4 w-80">
        {tasks.map(task => (
          <li 
            key={task.id} 
            className="flex justify-between items-center border-b py-2 last:border-b-0"
          >
            <span>{task.title}</span>
            <span>{task.completed ? "✅" : "❌"}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
