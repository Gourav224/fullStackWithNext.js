import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "../context/AuthProvider";
import { Toaster } from "@/components/ui/toaster";
import { SpeedInsights } from "@vercel/speed-insights/next";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "True Feedback",
    description: "Real feedback from real people.",
};

interface RootLayoutProps {
    children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
    return (
        <html lang="en">
            <AuthProvider>
                <body className={inter.className}>
                    {children}
                    <Toaster />
                    <SpeedInsights />
                </body>
            </AuthProvider>
        </html>
    );
}
