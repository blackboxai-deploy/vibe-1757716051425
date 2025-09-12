import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Xen Project Mastery | From Zero to Expert",
  description: "Master Xen hypervisor technology step by step - from absolute beginner to production deployment. Complete learning platform with AI-powered code generation and hardware optimization.",
  keywords: "Xen, hypervisor, virtualization, Type-1, paravirtualization, HVM, Linux, VMware, HP Pavilion Gaming"
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col">
            <div className="flex-1">
              {children}
            </div>
          </div>
          <Toaster richColors position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}