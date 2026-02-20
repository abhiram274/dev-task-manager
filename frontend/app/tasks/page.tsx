'use client'

import { useEffect, useState } from 'react'

type Task = {
  id: number
  title: string
  completed?: boolean
}

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
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12">
      <h1 className="text-3xl font-bold mb-6 text-green-600">All Tasks</h1>

      <ul className="bg-white shadow-lg rounded p-6 w-96">
        {tasks.map(task => (
          <li 
            key={task.id} 
            className="flex justify-between items-center border-b py-2 last:border-b-0"
          >
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
