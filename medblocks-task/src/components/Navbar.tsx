'use client';

import { useRouter } from 'next/navigation';

const Navbar = () => {
  const router = useRouter();

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <nav className="bg-blue-500 text-white p-4 flex justify-between">
      <div className="text-lg font-bold">Medblocks Task</div>
      <ul className="flex gap-4">
        <li><button onClick={() => handleNavigate('/')} className="cursor-pointer">Home</button></li>
        <li><button onClick={() => handleNavigate('/register')} className="cursor-pointer">Register</button></li>
        <li><button onClick={() => handleNavigate('/query')} className="cursor-pointer">Query Patients</button></li>
      </ul>
    </nav>
  );
};

export default Navbar;