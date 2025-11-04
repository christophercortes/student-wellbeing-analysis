export function SkeletonLoader() {
	return (
		<div className={`transition-opacity duration-300 opacity-100`}>
			<h1>Cargando</h1>
			{/* Button skeleton */}
			<div className="flex m-5">
				<div className="bg-gray-200 text-sm text-transparent border px-8 py-2 rounded w-32 h-10 animate-pulse"></div>
			</div>

			{/* Title skeleton */}
			<div className="mt-8 w-1/4 mx-auto h-6 bg-gray-200 rounded animate-pulse"></div>

			{/* Desktop table skeleton */}
			<div className="hidden mt-9 w-3/5 mx-auto md:block">
				{/* Table header */}
				<div className="grid grid-cols-4 lg:grid-cols-5 gap-4 mb-4">
					{["Name", "Code", "Duration", "Active", ""].map((item, index) => (
						<div
							key={index}
							className="h-6 bg-gray-200 rounded animate-pulse"
						></div>
					))}
				</div>

				{/* Table rows */}
				{[...Array(5)].map((_, rowIndex) => (
					<div
						key={rowIndex}
						className="grid grid-cols-4 lg:grid-cols-5 gap-4 mb-3 py-3 border-b border-gray-200"
					>
						{[...Array(5)].map((_, cellIndex) => (
							<div
								key={cellIndex}
								className="h-5 bg-gray-100 rounded animate-pulse"
								style={{ animationDelay: `${rowIndex * 0.1}s` }}
							></div>
						))}
					</div>
				))}
			</div>

			{/* Mobile skeleton */}
			<div className="space-y-4 md:hidden mt-5">
				{[...Array(3)].map((_, index) => (
					<div
						key={index}
						className="bg-white rounded-lg shadow p-4 border border-gray-200 space-y-3"
					>
						<div className="h-5 w-3/4 bg-gray-200 rounded animate-pulse"></div>
						<div className="h-4 w-full bg-gray-100 rounded animate-pulse"></div>
						<div className="h-4 w-full bg-gray-100 rounded animate-pulse"></div>
						<div className="h-4 w-full bg-gray-100 rounded animate-pulse"></div>
						<div className="h-4 w-1/4 bg-gray-100 rounded animate-pulse"></div>
					</div>
				))}
			</div>
		</div>
	);
}
