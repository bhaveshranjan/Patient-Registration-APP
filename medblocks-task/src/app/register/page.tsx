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


  if (!name || !age || !gender || !contactNumber || !bloodGroup) {
    toast.error('Please fill out all required fields.');
    return;
  }

  if (!/^\d{10}$/.test(contactNumber)) {
    toast.error('Please enter a valid 10-digit contact number.');
    return;
  }

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
   <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
  <h2 className="text-xl font-semibold underline underline-offset-4 mb-4">Register New Patient</h2>

  {/* Name */}
  <div className="flex items-center gap-4">
    <label className="w-40 font-medium">
      Patient Name <span className="text-red-600">*</span>
    </label>
    <input
      type="text"
      value={name}
      onChange={(e) => setName(e.target.value)}
      placeholder="Enter patient name"
      className="border p-2 flex-1 rounded"
      required
    />
  </div>

  {/* Age */}
  <div className="flex items-center gap-4">
    <label className="w-40 font-medium">
      Age <span className="text-red-600">*</span>
    </label>
    <input
  type="text"
  inputMode="numeric"
  pattern="[1-9][0-9]*"
  value={age}
  onChange={(e) => {
    const value = e.target.value;
    if (value === '' || /^[1-9][0-9]*$/.test(value)) {
      setAge(value === '' ? '' : Number(value));
    }
  }}
  placeholder="Enter age"
  className="border p-2 flex-1 rounded"
  required
/>

  </div>

  {/* Gender */}
  <div className="flex items-center gap-4">
    <label className="w-40 font-medium">
      Gender <span className="text-red-600">*</span>
    </label>
    <select
      value={gender}
      onChange={(e) => setGender(e.target.value)}
      className="border p-2 flex-1 rounded"
      required
    >
      <option value="">Select Gender</option>
      <option value="Male">Male</option>
      <option value="Female">Female</option>
      <option value="Other">Other</option>
    </select>
  </div>

  {/* Contact Number */}
  <div className="flex items-center gap-4">
    <label className="w-40 font-medium">
      Contact Number <span className="text-red-600">*</span>
    </label>
    <input
      type="text"
      value={contactNumber}
      onChange={(e) => setContactNumber(e.target.value)}
      placeholder="Enter 10-digit number"
      className="border p-2 flex-1 rounded"
      required
    />
  </div>

  {/* Blood Group */}
  <div className="flex items-center gap-4">
    <label className="w-40 font-medium">
      Blood Group <span className="text-red-600">*</span>
    </label>
    <input
      type="text"
      value={bloodGroup}
      onChange={(e) => setBloodGroup(e.target.value)}
      placeholder="e.g. A+, B-, O+"
      className="border p-2 flex-1 rounded"
      required
    />
  </div>

  {/* Known Allergies */}
  <div className="flex items-start gap-4">
    <label className="w-40 font-medium pt-2">Known Allergies</label>
    <textarea
      value={knownAllergies}
      onChange={(e) => setKnownAllergies(e.target.value)}
      placeholder="Mention allergies (optional)"
      className="border p-2 flex-1 rounded"
      rows={3}
    />
  </div>

  {/* Submit Button */}
  <div className="flex justify-end">
    <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
      Submit
    </button>
  </div>
</form>
    <ToastContainer />
    </>

  )
}
