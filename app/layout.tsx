import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { ThemeToggle } from "./components/ThemeToggle";
import { PageTitle } from "./components/PageTitle";
import { Providers } from "./providers";
import Image from "next/image";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: { default: "AI Digital Twin", template: "%s | AI Digital Twin" },
  description: "AI Digital Twin — personalized wellness companion",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <head>
        <link rel="icon" href="/favicon_dark.png" id="favicon" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
(function(){
  var t=localStorage.getItem('adt_theme');
  var href='/favicon_dark.png';
  if(t==='light')href='/favicon_light.png';
  else if(t==='dark')href='/favicon_dark.png';
  else if(window.matchMedia&&window.matchMedia('(prefers-color-scheme: light)').matches)href='/favicon_light.png';
  var el=document.getElementById('favicon');
  if(el)el.href=href;
})();
        `.trim(),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <Providers>
          <PageTitle />
          <header className="sticky top-0 z-40 border-b border-[var(--border-subtle)] bg-[var(--bg-base)]/80 backdrop-blur">
            <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 px-4 py-3 sm:px-6 sm:py-4">
              <Link href="/" className="flex items-center gap-3">
                <Image
                  src="/logo_dark.png"
                  alt="AI Digital Twin logo"
                  width={28}
                  height={28}
                  className="adt-logo-dark h-7 w-7"
                  priority
                />
                <Image
                  src="/logo_light.png"
                  alt="AI Digital Twin logo"
                  width={28}
                  height={28}
                  className="adt-logo-light h-7 w-7"
                  priority
                />
                <div className="text-sm font-semibold tracking-tight text-[var(--text-primary)]">
                  AI Digital Twin
                </div>
              </Link>
              <ThemeToggle />
            </div>
          </header>
          {children}
        </Providers>
      </body>
    </html>
  );
}
