import localFont from "next/font/local";
import "./globals.css";
import { ClerkProvider, SignedIn, SignedOut, SignIn, UserButton } from "@clerk/nextjs";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <header className="header-container">
            <h1 className="header">Eco Wise</h1>
            <div className="user-button-container">
            <UserButton showName />
            </div>
        </header>
        <SignedOut>
          <div className="sign-in-container">
            <SignIn routing="hash" />
          </div>
        </SignedOut>
        <SignedIn>
          {children}
        </SignedIn>
      </body>
    </html>
    </ClerkProvider>
  );
}
