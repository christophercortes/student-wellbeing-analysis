import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth/authOptions";

export const metadata: Metadata = {
	title: "Home",
};

export default async function Page() {
	const session2 = await getServerSession(authOptions);
	const isAuthtenticated = session2?.user;
	return (
		<div>
			<div className="relative flex flex-col-reverse md:flex-row items-center justify-between min-h-screen max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-20 py-16 gap-12">
				{/* Header Section */}
				<header className="absolute top-6 left-6 flex w-full items-center text-xl font-bold tracking-wide">
					<h1>Welcome</h1>
					{!isAuthtenticated && (
						<Link href="/auth/login" prefetch={true} className="ml-auto mr-10">
							<button className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
								Log in
							</button>
						</Link>
					)}

					{isAuthtenticated && (
						<Link href="/dashboard" prefetch={true} className="ml-auto mr-10">
							<button className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
								Dashboard
							</button>
						</Link>
					)}
				</header>

				{/* Text Content */}
				<div className="w-full md:w-3/5 space-y-6 text-left">
					<h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
						Student Sentiment Awareness
					</h1>
					<p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
						&quot;The secret is here in the present. If you pay attention to the
						present, you can improve upon it. And, if you improve on the
						present, what comes later will also be better.&quot;
						<span className="Block mt-2 text-sm italic text-gray-500 dark:text-gray-400">
							- Paulo Coelho
						</span>
					</p>
				</div>

				{/* Image */}
				<div className="w-full md:w-2/5 flex justify-center md:justify-end">
					<Image
						src="/instructor.png"
						width={600}
						height={560}
						className="rounded-xl shadow-xl border-2 border-gray-200 dark:border-gray-700"
						alt="Instructor"
						priority
					/>
				</div>
			</div>
		</div>
	);
}
