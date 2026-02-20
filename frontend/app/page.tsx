'use client'

import { useEffect, useState } from 'react'

type Task = { id: number; title: string; completed?: boolean }

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([])
  const API = process.env.NEXT_PUBLIC_API_URL

  useEffect(() => {
    fetch(`${API}/tasks`)
      .then(res => res.json())
      .then(data => setTasks(data))
      .catch(err => console.error("Error fetching tasks:", err))
  }, [API])

  const toggleTask = async (id: number, completed: boolean) => {
    const res = await fetch(`${API}/tasks/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !completed })
    })
    const updated = await res.json()
    setTasks(tasks.map(t => t.id === id ? updated : t))
  }

  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6">
      <h1 className="text-2xl font-bold text-green-600 mb-4">All Tasks</h1>

      <ul className="divide-y divide-gray-200">
        {tasks.map(task => (
          <li key={task.id} className="flex justify-between items-center py-2">
            <span className={task.completed ? "line-through text-gray-500" : ""}>
              {task.title}
            </span>
            <button 
              onClick={() => toggleTask(task.id, task.completed ?? false)}
              className="text-sm px-3 py-1 rounded bg-green-500 text-white hover:bg-green-600 transition"
            >
              {task.completed ? "Undo" : "Complete"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
