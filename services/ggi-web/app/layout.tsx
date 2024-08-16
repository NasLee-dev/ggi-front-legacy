'use client'
import RootLayoutProvider from 'app/shared/components/layout/RootLayoutProvider'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  

  return (
    <html lang="en">
      <head>
        <meta name="google" content="notranslate" />
        <meta
          name="content-disposition"
          content='attachment; filename="filename.pdf"'
        />
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/sun-typeface/SUIT/fonts/static/woff2/SUIT.css"
        />
        <meta
          name="viewport"
          content="initial-scale=1.0,user-scalable=no,maximum-scale=1,width=device-width, minimum-scale=1.0"
        />
      </head>
      <body>
        <RootLayoutProvider>{children}</RootLayoutProvider>
      </body>
    </html>
  )
}
