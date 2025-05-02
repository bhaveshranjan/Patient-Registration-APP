'use client';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null; // Prevent rendering on SSR

  return (
    <nav className="bg-blue-500 text-white p-4 flex justify-between">
      <div className="text-lg font-bold">Medblocks Task</div>
      <ul className="flex gap-4">
        <li><button onClick={() => handleNavigate('/')}>Home</button></li>
        <li><button onClick={() => handleNavigate('/register')}>Register</button></li>
        <li><button onClick={() => handleNavigate('/query')}>Query Patients</button></li>
      </ul>
    </nav>
  );
}
