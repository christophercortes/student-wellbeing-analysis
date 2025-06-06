"use client";
import { toast } from "sonner";

export default function RegisterPage() {
	const handleSubmit = (e) => {
		e.preventDefault();
		const data = new FormData(e.target);
		const object = Object.fromEntries(data);
		if (object.password !== object.confirmPassword) {
			toast.warning(
				"Confirm password doesnt match, please validate it and try again."
			);
			return;
		}
		console.log(object);
	};
	return (
		<div className="flex flex-col items-center mt-10">
			<h2 className="text-2xl font-bold">Register</h2>
			<form
				className="flex flex-col gap-10 mt-5 w-6/12 "
				onSubmit={handleSubmit}
			>
				<label htmlFor="fullName" className="relative">
					<input
						placeholder="fullName"
						type="text"
						name="fullName"
						id="fullName"
						className="border-b focus:valid:border-b-blue-500 focus:invalid:border-b-red-500 outline-0 placeholder:opacity-0 peer w-full "
					/>
					<span
						className="absolute top-0 left-0 transform duration-300 peer-focus-within:-translate-y-8
					 peer-focus-within:text-blue-500 peer-not-placeholder-shown:-translate-y-8 peer-not-placeholder-shown:text-blue-500 peer-not-placeholder-shown:peer-invalid:text-red-500"
					>
						{" "}
						Full name:
					</span>
				</label>
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

				<label htmlFor="number" className="relative">
					<input
						placeholder="number"
						type="tel"
						pattern="^[+]+[0-9]{11}"
						title='Follow the format: "Start with + and then 11 numbers"'
						name="number"
						id="number"
						className="border-b focus:valid:border-b-blue-500 focus:invalid:border-b-red-500 outline-0 placeholder:opacity-0 peer w-full "
					/>
					<span
						className="absolute top-0 left-0 transform duration-300 peer-focus-within:-translate-y-8
					 peer-focus-within:text-blue-500 peer-not-placeholder-shown:-translate-y-8 peer-not-placeholder-shown:text-blue-500 peer-not-placeholder-shown:peer-invalid:text-red-500"
					>
						{" "}
						Phone Number:
					</span>
				</label>

				<label htmlFor="address" className="relative">
					<input
						placeholder="address"
						type="text"
						name="address"
						id="address"
						className="border-b focus:valid:border-b-blue-500 focus:invalid:border-b-red-500 outline-0 placeholder:opacity-0 peer w-full "
					/>
					<span
						className="absolute top-0 left-0 transform duration-300 peer-focus-within:-translate-y-8
					 peer-focus-within:text-blue-500 peer-not-placeholder-shown:-translate-y-8 peer-not-placeholder-shown:text-blue-500 peer-not-placeholder-shown:peer-invalid:text-red-500"
					>
						{" "}
						Address:
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
					 peer-focus-within:text-blue-500 peer-not-placeholder-shown:-translate-y-8 peer-not-placeholder-shown:text-blue-500 peer-not-placeholder-shown:peer-invalid:text-red-500"
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
