import NextAuth from 'next-auth';
import authOptions from '@/lib/auth/authOptions'; // This fixed the problem

// --- THE FIX IS HERE: REMOVE 'export' ---
// --- SECOND IMPORTANT FIX: MOVED authOptions to src/lib/auth/authOptions to allow
// 	   both this to work, and for authOptions to be accessed in other files --- 

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST, };
