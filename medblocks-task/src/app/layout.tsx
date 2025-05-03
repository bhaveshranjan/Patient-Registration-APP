import Navbar from '@/components/Navbar';
import './globals.css';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Medblocks Task</title>
      </head>
      <body className="flex flex-col min-h-screen justify-between">
        <Navbar />
        <main className="flex-grow flex items-center justify-center mx-4">
          {children}
        </main>
      </body>
    </html>
  );
}
