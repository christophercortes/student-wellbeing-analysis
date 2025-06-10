import type { Metadata } from "next";
import "@/styles/globals.css";
import { inter } from "@/components/fonts";
//import Header from "@/components/dashboard/header";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
	title: "Sentiment Analysis",
	description: "",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${inter.className} antialiased`}>
				{/* <Header /> */}
				{children}
				<Toaster richColors position="top-center" />
			</body>
		</html>
	);
}
