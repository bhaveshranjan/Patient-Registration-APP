'use client'

import { useEffect, useState } from 'react'
import db  from '@/lib/db'

export default function QueryPage() {
  const [query, setQuery] = useState('SELECT * FROM patients')
  const [rows, setRows] = useState<any[]>([])

  const runQuery = async () => {
    try {
      const result = await db.query(query)
      setRows(result.rows)
    } catch (err) {
      alert('Invalid SQL Query')
    }
  }

  useEffect(() => {
    runQuery()
  }, [])

  return (
    <div className="max-w-2xl space-y-4">
      <h2 className="text-xl font-semibold">Run SQL Query</h2>
      <textarea
        rows={4}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border p-2 w-full"
      />
      <button onClick={runQuery} className="bg-blue-600 text-white px-4 py-2 rounded">
        Run Query
      </button>
      <table className="w-full border mt-4 text-sm">
        <thead>
          <tr>
            {rows[0] &&
              Object.keys(rows[0]).map((key) => (
                <th key={key} className="border px-2 py-1">
                  {key}
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {Object.values(row).map((value, j) => (
                <td key={j} className="border px-2 py-1">
                  {value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
