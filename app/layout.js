import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Twin Compass Travel",
  description: "Your trusted partner in turning your global travel and study aspirations into reality.",
  icons: {
    icon: [
      { url: '/Images/TWINCOMPASSLOGO.png', sizes: '16x16', type: 'image/png' },
      { url: '/Images/TWINCOMPASSLOGO.png', sizes: '32x32', type: 'image/png' },
      { url: '/Images/TWINCOMPASSLOGO.png', sizes: '48x48', type: 'image/png' },
      { url: '/Images/TWINCOMPASSLOGO.png', sizes: '192x192', type: 'image/png' }
    ],
    apple: [
      { url: '/Images/TWINCOMPASSLOGO.png', sizes: '180x180', type: 'image/png' }
    ]
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
