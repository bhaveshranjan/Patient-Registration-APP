import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <div className="text-center py-8">
        <h2 className="text-2xl font-semibold">Welcome to the Medblocks Patient App</h2>
        <p className="mt-4 text-lg text-gray-700">
          Hi there! I'm <span className="font-bold">Bhavesh Ranjan</span>, a passionate software developer with a strong focus on building innovative solutions. This application showcases my skills in full-stack development, utilizing modern frameworks like Next.js, TypeScript, and PGlite.
        </p>
        <p className="mt-4 text-lg text-gray-700">
          I believe in the power of technology to solve real-world problems, and through this project, I aim to improve patient management processes with a simple and effective platform. 
        </p>
        <div className="mt-6">
          <p className="text-lg text-gray-700">
            Feel free to explore my work and connect with me:
          </p>
          <div className="space-x-4 mt-4">
            <a 
              href="https://www.linkedin.com/in/bhaveshranjan" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-blue-600 hover:underline"
            >
              LinkedIn
            </a>
            <a 
              href="https://github.com/bhaveshranjan" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-blue-600 hover:underline"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
      <div className="text-center w-full max-w-xl px-4 mt-8 mx-auto">
  <p className="text-lg text-gray-700">
    Some of my key achievements:
  </p>
  <ul className="list-disc pl-5 mt-2 space-y-2 text-left mx-auto">
    <li>Built and deployed a full-stack learning management system using the MERN stack.</li>
    <li>Created APIs for an online food delivery system, focusing on performance optimization.</li>
    <li>I'm proud to be in the top 8.67% of all users globally on LeetCode.</li>
  </ul>
</div>
    </main>
  );
}
