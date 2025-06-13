import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import connectDB from '@/config/database';
import Teacher from '@/models/Teacher';
import bcrypt from 'bcryptjs';
import { AuthOptions } from 'next-auth';

// --- THE FIX IS HERE: REMOVE 'export' ---
const authOptions: AuthOptions = {
	// ------------------------------------

	providers: [
		CredentialsProvider({
			name: 'credentials',
			credentials: {
				email: { label: 'Email', type: 'text' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials?.password) {
					throw new Error('Email and password are required.');
				}

				await connectDB();

				const teacher = await Teacher.findOne({
					email: credentials.email,
				}).select('+password');

				if (!teacher || !teacher.isActive) {
					throw new Error('Invalid credentials or inactive account.');
				}

				const isPasswordCorrect = await bcrypt.compare(
					credentials.password,
					teacher.password!
				);

				if (!isPasswordCorrect) {
					throw new Error('Invalid credentials or inactive account.');
				}

				return {
					id: teacher._id.toString(),
					name: teacher.fullName,
					email: teacher.email,
					image: teacher.profilePicture,
				};
			},
		}),
	],
	session: {
		strategy: 'jwt',
	},
	secret: process.env.AUTH_SECRET,
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id;
			}
			return token;
		},
		async session({ session, token }) {
			if (session.user) {
				session.user.id = token.id as string;
			}
			return session;
		},
	},
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST, authOptions };
