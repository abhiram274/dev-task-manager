'use client'

import { useEffect, useState } from 'react'

export default function Home() {
  const [tasks, setTasks] = useState<any[]>([])
  const [title, setTitle] = useState("")

  const API = process.env.NEXT_PUBLIC_API_URL

  useEffect(() => {
    fetch(`${API}/tasks`)
      .then(res => res.json())
      .then(data => setTasks(data))
  }, [])

  const addTask = async () => {
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
    <div style={{ padding: 40 }}>
      <h1>DevTask Manager</h1>

      <input 
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter task"
      />
      <button onClick={addTask}>Add</button>

      <ul>
        {tasks.map(task => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
    </div>
  )
}