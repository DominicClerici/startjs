import Script from "next/script"
import "./globals.css"
import { Inter } from "next/font/google"
import localFont from "next/font/local"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

const jakarta = localFont({
  src: "./fonts/PlusJakartaSansRegular.woff2",

  variable: "--font-jakarta",
})

export const metadata = {
  title: "Start.js",
  description: "A beautiful, customizable start page for your browser.",
  icons: {
    icon: "/favicon.ico",
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${jakarta.variable} ${inter.variable}`}>
        <Script id="watchScript">{`const getSuggestions = (d) => { document.getElementById("watch").innerText = d }`}</Script>
        <div id="watch"></div>

        {children}
      </body>
    </html>
  )
}
