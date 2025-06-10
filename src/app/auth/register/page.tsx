'use client';

import { useSession } from 'next-auth/react';
import { signIn } from 'next-auth/react';
import { FormEvent, useEffect } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

// export async function getServerSideProps(context) {
// 	const session = await getServerSession(context.req, context.res, authOptions);

// 	if (!session) {
// 		return {
// 			redirect: {
// 				destination: '/',
// 				permanent: false,
// 			},
// 		};
// 	}

// 	return {
// 		props: {
// 			session,
// 		},
// 	};
// }

export default function RegisterPage() {
	const { status, data } = useSession();
	const router = useRouter();

	useEffect(() => {
		if (status === 'authenticated') {
			router.push('/dashboard');
		}
	}, [status, router]);

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const data = new FormData(e.currentTarget);
		const object = Object.fromEntries(data);

		if (object.password !== object.confirmPassword) {
			toast.warning(
				'Confirm password doesnt match, please validate it and try again.'
			);
			return;
		}
		const { email, password, fullName } = object;

		object.subjectSpecialization = '';
		const teacherRegistered = await registerTeacher(object);

		if (!teacherRegistered.ok) {
			const json = await teacherRegistered.json();
			toast.error(json.message);
		} else {
			// If registration is successful, sign in the user
			const signInResult = await signIn('credentials', {
				email,
				password,
				redirect: false,
			});

			if (signInResult?.ok) {
				toast.success('Welcome! ' + fullName);
				router.push('/dashboard'); // or wherever you want to redirect after successful registration
			}
		}
		console.log('teachers: ', teacherRegistered);
	};

	const registerTeacher = async (teacher: any) => {
		return await fetch(
			`${
				process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
			}/api/teachers/register`,
			{
				cache: 'no-cache',
				method: 'POST',
				body: JSON.stringify(teacher),
			}
		);
	};

	// Show loading state while checking session
	if (status === 'loading') {
		return <div>Loading...</div>;
	}

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
						{' '}
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
						{' '}
						Email:
					</span>
				</label>

				<label htmlFor="phoneNumber" className="relative">
					<input
						placeholder="number"
						type="tel"
						pattern="^[+]+[0-9]{11}"
						title='Follow the format: "Start with + and then 11 numbers"'
						name="phoneNumber"
						id="phoneNumber"
						className="border-b focus:valid:border-b-blue-500 focus:invalid:border-b-red-500 outline-0 placeholder:opacity-0 peer w-full "
					/>
					<span
						className="absolute top-0 left-0 transform duration-300 peer-focus-within:-translate-y-8
					 peer-focus-within:text-blue-500 peer-not-placeholder-shown:-translate-y-8 peer-not-placeholder-shown:text-blue-500 peer-not-placeholder-shown:peer-invalid:text-red-500"
					>
						{' '}
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
						{' '}
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
						{' '}
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
						{' '}
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
			{status}
		</div>
	);
}
