import Time from '@/components/dashboard/date';
import Search from '@/components/dashboard/SearchStudent';
import StudentTable from '@/components/dashboard/StudentTable';
import { Suspense } from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Records',
};

export default function Page() {
	return (
		<div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 py-6">
			<div className="w-full max-w-7xl mx-auto space-y-6">
				<div className="flex justify-end">
					<Time />
				</div>
				<Suspense>
					<div className="w-full">
						<Search placeholder="Search for a student..." />
					</div>
				</Suspense>
				<div className="bg-white rounded-lg shadow border border-gray-200 p-4 overflow-auto">
					<Suspense>
						<div className="w-full">
							<StudentTable />
						</div>
					</Suspense>
				</div>
			</div>
		</div>
	);
}
