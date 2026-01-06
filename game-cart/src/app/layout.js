import { Outfit } from "next/font/google";
import "./globals.css";
import { AppContextProvider } from "@/context/AppContext";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ClerkProvider } from '@clerk/nextjs';
const outfit = Outfit({ subsets: ["latin"], weight: ["300", "400", "500"] });

export const metadata = {
  title: "Gamecart",
  description: "Modern E-Commerce Platform",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" className="scroll-smooth">
        <body className={`${outfit.className} min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 text-slate-900 antialiased selection:bg-indigo-200/70 selection:text-indigo-950 overflow-x-clip`}>
          <Toaster position="top-right" />
          <AppContextProvider>
            <div className="relative min-h-screen flex flex-col">
              <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute -top-32 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-indigo-200/30 blur-3xl" />
                <div className="absolute top-[35vh] -left-40 h-[520px] w-[520px] rounded-full bg-violet-200/25 blur-3xl" />
                <div className="absolute -bottom-48 right-0 h-[520px] w-[520px] rounded-full bg-sky-200/25 blur-3xl" />
              </div>

              <Navbar />

              <main className="relative z-10 flex-grow pt-16">
                {children}
              </main>
              <Footer/>
            </div>
          </AppContextProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}