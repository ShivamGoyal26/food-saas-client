import { ThemeSwitcher } from "@/components/kibo-ui/theme-switcher";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div suppressHydrationWarning className="flex flex-col min-h-screen">
      {/* Header with ThemeSwitcher */}
      <header className="flex items-center justify-end">
        <ThemeSwitcher />
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md md:max-w-lg lg:max-w-xl">
          {children}
        </div>
      </main>
    </div>
  );
}
