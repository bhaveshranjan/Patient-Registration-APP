import Navbar from '@/components/Navbar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Medblocks Task</title>
      </head>
      <body>
        <Navbar />
        <main>{children}</main> {/* This will render the content of the current page */}
      </body>
    </html>
  );
}
