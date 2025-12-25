import type { Metadata } from 'next'
import { Inter, Roboto, Montserrat } from 'next/font/google'
import './globals.css'
import Navigation from './components/Navigation'

const roboto = Roboto({ 
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'] 
})

const montserrat = Montserrat({
  weight: ['700'],
  subsets: ['latin'],
  variable: '--font-montserrat'
})

export const metadata: Metadata = {
  title: 'MONTELA - YouTube Premium',
  description: 'YouTube Premium Digital Product',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${roboto.className} ${montserrat.variable} bg-[#0f0f0f] text-white min-h-screen`}>
        <Navigation />
        {children}
      </body>
    </html>
  )
}