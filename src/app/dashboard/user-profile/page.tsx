/*
    This page displays the teacher information and also allows for the user
    information.
 */
// Use Client to use react
"use client";

// Imports
import { useSession } from "next-auth/react"; // Obtain the session to use in the code

// Export the main function
export default function UserProfile()
{
    // Obtain the data inside the session
    const { data: Session } = useSession(); // Comment this out for a second while you test this page, it should work because of what is imported

    // Return the rendered page
    return (<>
        <h2>Hello This Is the Teacher Info Page.</h2>
        <h2>{Session ? (<p>The id: {Session.user.id}</p>) : (<p>Please Log in.</p>)}</h2>
    </>);
}