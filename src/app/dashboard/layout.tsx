import SideNav from "@/components/dashboard/sidenav";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex h-screen flex-col">
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
