import Navbar from '@/components/Navbar';
import './globals.css';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Medblocks Task</title>
      </head>
      <body>
        <Navbar />
        <main>{children}</main> 
      </body>
    </html>
  );
}
