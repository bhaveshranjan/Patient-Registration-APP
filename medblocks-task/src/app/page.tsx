import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <nav className="bg-blue-600 p-4 text-white flex justify-between">
        <h1 className="text-xl font-bold">Medblocks Task</h1>
        <div className="space-x-4">
          <Link href="/register">Register Patient</Link>
          <Link href="/query">Query Patients</Link>
        </div>
      </nav>
      <section className="p-8">
        <h2 className="text-2xl font-semibold">Welcome to Medblocks Task App</h2>
        <p className="mt-2 text-gray-600">
          Use the navigation bar to register new patients or run SQL queries.
        </p>
      </section>
    </main>
  );
}


