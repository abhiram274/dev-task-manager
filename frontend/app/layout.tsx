import './globals.css'
import Link from 'next/link'

export const metadata = {
  title: 'DevTask Manager',
  description: 'Manage tasks with Next.js + Render + Vercel',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900">
        <nav className="bg-blue-600 text-white px-6 py-3 flex gap-6 shadow-md">
          <Link href="/" className="hover:text-yellow-300 transition">Home</Link>
          <Link href="/tasks" className="hover:text-yellow-300 transition">Tasks</Link>
        </nav>
        <main className="container mx-auto px-6 py-10">{children}</main>
      </body>
    </html>
  )
}
