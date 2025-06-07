"use client";

export default function LoginPage() {
	const handleSubmit = (e) => {
		e.preventDefault();
		const data = new FormData(e.target);
		const object = Object.fromEntries(data);
		console.log(object);
	};
	return (
		<div className="flex flex-col items-center mt-10">
			<h2 className="text-2xl font-bold">Login</h2>
			<form
				method="POST"
				className="flex flex-col gap-10 mt-5 w-6/12 "
				onSubmit={handleSubmit}
			>
				<label htmlFor="email" className="relative">
					<input
						placeholder="email"
						type="email"
						name="email"
						id="email"
						className="border-b focus:valid:border-b-blue-500 focus:invalid:border-b-red-500 outline-0 placeholder:opacity-0 peer w-full "
					/>
					<span
						className="absolute top-0 left-0 transform duration-300 peer-focus-within:-translate-y-8
					 peer-focus-within:text-blue-500 peer-not-placeholder-shown:-translate-y-8 peer-not-placeholder-shown:text-blue-500 peer-not-placeholder-shown:peer-invalid:text-red-500"
					>
						{" "}
						Email:
					</span>
				</label>

				<label
					htmlFor="password"
					className="relative border-b focus-within:border-blue-500 "
				>
					<input
						placeholder="password"
						type="password"
						name="password"
						id="password"
						className="border-0 outline-0 placeholder:opacity-0 peer"
					/>
					<span
						className="absolute top-0 left-0 transform duration-300 peer-focus-within:-translate-y-8
					 peer-focus-within:text-blue-500 peer-not-placeholder-shown:-translate-y-8 peer-not-placeholder-shown:text-blue-500 peer-not-placeholder-shown:peer-invalid:text-red-500"
					>
						{" "}
						Password:
					</span>
				</label>
				<button
					className="px-7 py-3 self-center border-1 rounded-md hover:cursor-pointer hover:bg-blue-500 -mt-3 w-32"
					type="submit"
				>
					Register
				</button>
			</form>
		</div>
	);
}
