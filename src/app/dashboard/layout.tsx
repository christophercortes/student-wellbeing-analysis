import SideNav from "@/components/dashboard/sidenav";
import Header from "@/components/dashboard/header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <aside className="hidden md:block w-64 border-r border-gray-200 bg-white">
          <SideNav />
        </aside>
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
}
