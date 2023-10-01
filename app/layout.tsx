import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

import './globals.css';

export const metadata = {
  title: 'Flexibble',
  description: 'Showcase and discover remarkable developer projects'
}

export default function RootLayout({
  children,
}: { children: React.ReactNode }) {
  return (

    <html lang="eng">
      <body>
        <NavBar />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}