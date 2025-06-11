'use client';

import { signIn, SignInResponse, useSession } from 'next-auth/react';
import { FormEvent, useEffect } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
	const { status } = useSession();
	const router = useRouter();

	useEffect(() => {
		if (status === 'authenticated') {
			router.push('/dashboard');
		}
	}, [status, router]);
	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const form = e.currentTarget;
		const data = new FormData(form);
		const formObject = Object.fromEntries(data);
		const { email, password } = formObject;
		const signInResult = await signIn('credentials', {
			email,
			password,
			redirect: false,
			callbackUrl: '/dashboard',
		});
		authLogic(signInResult);
	};

	function authLogic(resp: SignInResponse | undefined) {
		if (resp?.status != 200) {
			toast.error(resp?.error);
			return;
		}
		toast.success('You are logged in now!');
		router.push('/dashboard');
	}
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
						{' '}
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
						{' '}
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
			<Link
				href={'/auth/register'}
				className="text-blue-500 mt-3 no-underline md:hover:underline"
			>
				{' '}
				Go to register page
			</Link>
		</div>
	);
}
