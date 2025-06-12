import type { Metadata } from 'next';
import '@/styles/globals.css';
import { inter } from '@/components/fonts';
import { Toaster } from '@/components/ui/sonner';
import SessionProvider from '@/components/providers/SessionProvider';

export const metadata: Metadata = {
	title: 'Sentiment Analysis',
	description: '',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${inter.className} antialiased`}>
				<SessionProvider>
					{children}
					<Toaster richColors position="top-center" />
				</SessionProvider>
			</body>
		</html>
	);
}
