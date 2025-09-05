import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '鬼滅の刃 AI Studio | Kimetsu no Yaiba Character Generator',
  description: 'Forge legendary Demon Slayer characters with the power of breathing techniques. Create stunning anime artwork inspired by Kimetsu no Yaiba using advanced AI generation.',
  keywords: ['Kimetsu no Yaiba', 'Demon Slayer', 'AI Art', 'Anime Generator', 'Character Creator', 'Breathing Techniques'],
  authors: [{ name: 'AI Studio' }],
  creator: 'AI Studio',
  publisher: 'AI Studio',
  openGraph: {
    title: '鬼滅の刃 AI Studio',
    description: 'Create stunning Demon Slayer characters with AI',
    url: '/',
    siteName: 'Kimetsu no Yaiba AI Studio',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '鬼滅の刃 AI Studio',
    description: 'Create stunning Demon Slayer characters with AI',
    creator: '@aistudio',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        <div id="root" className="min-h-screen">
          {children}
        </div>
      </body>
    </html>
  )
}