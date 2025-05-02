'use client'

import { useState, useEffect } from 'react'
import db from '@/lib/db'

export default function RegisterPage() {
  const [name, setName] = useState('')
  const [age, setAge] = useState<number | ''>('')

  useEffect(() => {
    (async () => {
      await db.exec(`
        CREATE TABLE IF NOT EXISTS patients (
          id SERIAL PRIMARY KEY,
          name TEXT,
          age INTEGER,
          gender TEXT
        );
      `);
    })();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      // Directly interpolate the values into the query string
      await db.exec(`
        INSERT INTO patients (name, age) VALUES ('${name}', ${age});
      `)

      const channel = new BroadcastChannel('patient_channel')
      channel.postMessage('new_patient')
      channel.close()
      setName('')
      setAge('')
      console.log('Patient registered successfully!') // Console log when patient is registered
      alert('Patient registered!')
    } catch (error) {
      console.error('Error during registration:', error)
      alert('There was an error registering the patient.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <h2 className="text-xl font-semibold">Register New Patient</h2>
      <input
        type="text"
        value={name}
        placeholder="Patient Name"
        onChange={(e) => setName(e.target.value)}
        className="border p-2 w-full"
        required
      />
      <input
        type="number"
        value={age}
        placeholder="Age"
        onChange={(e) => setAge(Number(e.target.value))}
        className="border p-2 w-full"
        required
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Submit
      </button>
    </form>
  )
}
