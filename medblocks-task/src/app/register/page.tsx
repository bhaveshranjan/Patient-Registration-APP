'use client'

import { useState, useEffect } from 'react'
import db from '@/lib/db'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function RegisterPage() {
  const [name, setName] = useState('')
  const [age, setAge] = useState<number | ''>('')
  const [gender, setGender] = useState('')
  const [contactNumber, setContactNumber] = useState('')
  const [bloodGroup, setBloodGroup] = useState('')
  const [knownAllergies, setKnownAllergies] = useState('')

  useEffect(() => {
    (async () => {
      await db.exec(`
        CREATE TABLE IF NOT EXISTS patients (
          id SERIAL PRIMARY KEY,
          name TEXT,
          age INTEGER,
          gender TEXT,
          contact_number TEXT,
          blood_group TEXT,
          known_allergies TEXT
        );
      `);

      await db.exec(`
        DO $$
        BEGIN
          IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'patients' AND column_name = 'contact_number') THEN
            ALTER TABLE patients ADD COLUMN contact_number TEXT;
          END IF;

          IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'patients' AND column_name = 'blood_group') THEN
            ALTER TABLE patients ADD COLUMN blood_group TEXT;
          END IF;

          IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'patients' AND column_name = 'known_allergies') THEN
            ALTER TABLE patients ADD COLUMN known_allergies TEXT;
          END IF;
        END $$;
      `);
    })();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await db.exec(`
        INSERT INTO patients (name, age, gender, contact_number, blood_group, known_allergies)
        VALUES ('${name}', ${age}, '${gender}', '${contactNumber}', '${bloodGroup}', '${knownAllergies}');
      `)

      const channel = new BroadcastChannel('patient_channel')
      channel.postMessage('new_patient')
      channel.close()
      setName('')
      setAge('')
      setGender('')
      setContactNumber('')
      setBloodGroup('')
      setKnownAllergies('')
      toast.success('Patient registered successfully!')
    } catch (error) {
      toast.error('There was an error registering the patient.')
    }
  }

  return (
    <>
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
      <select
        value={gender}
        onChange={(e) => setGender(e.target.value)}
        className="border p-2 w-full"
        required
      >
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>
      <input
        type="text"
        value={contactNumber}
        placeholder="Contact Number"
        onChange={(e) => setContactNumber(e.target.value)}
        className="border p-2 w-full"
        required
      />
      <input
        type="text"
        value={bloodGroup}
        placeholder="Blood Group"
        onChange={(e) => setBloodGroup(e.target.value)}
        className="border p-2 w-full"
        required
      />
      <textarea
        value={knownAllergies}
        placeholder="Known Allergies"
        onChange={(e) => setKnownAllergies(e.target.value)}
        className="border p-2 w-full"
        rows={3}
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Submit
      </button>
    </form>
    <ToastContainer />
    </>

  )
}
