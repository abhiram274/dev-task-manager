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
    <div style={{ padding: 40 }}>
      <h1>All Tasks</h1>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            {task.title}{" "}
            <button onClick={() => toggleTask(task.id, task.completed ?? false)}>
              {task.completed ? "Mark Incomplete" : "Mark Complete"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
