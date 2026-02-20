'use client'

import { useEffect, useState } from 'react'

type Task = { id: number; title: string; completed?: boolean }

export default function TasksPage() {
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

  const toggleTask = async (id: number, completed: boolean) => {
    const res = await fetch(`${API}/tasks/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !completed })
    })
    const updated = await res.json()
    setTasks(tasks.map(t => t.id === id ? updated : t))
  }

  const deleteTask = async (id: number) => {
    await fetch(`${API}/tasks/${id}`, { method: "DELETE" })
    setTasks(tasks.filter(t => t.id !== id))
  }

  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6">
      <h1 className="text-2xl font-bold text-green-600 mb-6">All Tasks</h1>

      {/* Add Task Form */}
      <div className="flex gap-2 mb-6">
        <input 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter new task"
          className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <button 
          onClick={addTask}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Add
        </button>
      </div>

      {/* Task List */}
      <ul className="space-y-3">
        {tasks.map(task => (
          <li 
            key={task.id} 
            className={`flex justify-between items-center px-4 py-3 rounded border shadow-sm ${
              task.completed ? "bg-green-50 border-green-300" : "bg-yellow-50 border-yellow-300"
            }`}
          >
            <span className={`font-medium ${task.completed ? "line-through text-gray-500" : "text-gray-800"}`}>
              {task.title}
            </span>
            <div className="flex gap-2">
              <button 
                onClick={() => toggleTask(task.id, task.completed ?? false)}
                className={`text-sm px-3 py-1 rounded ${
                  task.completed 
                    ? "bg-blue-500 text-white hover:bg-blue-600" 
                    : "bg-green-500 text-white hover:bg-green-600"
                } transition`}
              >
                {task.completed ? "Undo" : "Complete"}
              </button>
              <button 
                onClick={() => deleteTask(task.id)}
                className="text-sm px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
