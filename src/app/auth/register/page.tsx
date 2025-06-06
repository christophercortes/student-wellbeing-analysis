"use client";
import { FormEvent } from "react";

export default function RegisterPage() {
	const handleSubmit = (e) => {
		e.preventDefault();
		const data = new FormData(e.target);
		const object = Object.fromEntries(data);
		console.log(object);
	};
	return (
		<div className="flex flex-col items-center mt-10">
			<h2 className="text-2xl font-bold">Register</h2>
			<form
				className="flex flex-col gap-10 mt-5 w-6/12"
				onSubmit={handleSubmit}
			>
				<label
					htmlFor="email"
					className="relative border-b focus-within:border-blue-500"
				>
					<input
						placeholder="email"
						type="email"
						name="email"
						id="email"
						className="border-0 outline-0 placeholder:opacity-0 peer "
					/>
					<span
						className="absolute top-0 left-0 transform duration-300 peer-focus-within:-translate-y-8
					 peer-focus-within:text-blue-500 peer-not-placeholder-shown:-translate-y-8"
					>
						{" "}
						Email:
					</span>
				</label>

				<label
					htmlFor="password"
					className="relative border-b focus-within:border-blue-500"
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
					 peer-focus-within:text-blue-500 peer-not-placeholder-shown:-translate-y-8"
					>
						{" "}
						Password:
					</span>
				</label>
				<label
					htmlFor="confirmPassword"
					className="relative border-b focus-within:border-blue-500"
				>
					<input
						placeholder="confirmPassword"
						type="password"
						name="confirmPassword"
						id="confirmPassword"
						className="border-0 outline-0 placeholder:opacity-0 peer "
					/>
					<span
						className="absolute top-0 left-0 transform duration-300 peer-focus-within:-translate-y-8
					 peer-focus-within:text-blue-500 peer-not-placeholder-shown:-translate-y-8"
					>
						{" "}
						ConfirmPassword:
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
