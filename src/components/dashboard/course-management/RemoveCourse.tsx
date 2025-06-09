// Use Client
"use client"

// Imports
import { useRouter } from "next/navigation";

// Function that removes the course
export default function RemoveCourse({ id, courseName }: { id: string; courseName: string; }) 
{
    // Create a router to reload the page after the action was completed
    const router = useRouter();

    // Remove the course
    const removeTheStudentFormDb = async () => {
        // Check to make sure the user is sure they want to remove the course
        const confirmed = confirm(`Are you sure you want to delete ${courseName}?`);

        // If they say yes
        if (confirmed)
        {
            try
            {
                // Connect to the api and delete the course
                const res = await fetch( 
                        `${ process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000" }/api/courses/${id}`, 
                        {
                            method: "DELETE",
                        }
                );

                if (res.ok)
                {
                    // Refresh the page
                    router.refresh();
                } else {
                    // Throw an error
                    throw new Error("Could not delete course.");
                }
            } catch (error) {
                // Log the error
                console.log(error);
            }
        }
    }

    // Return the button
    return (
    <button onClick={ removeTheStudentFormDb } className="text-red-400 hover:text-red-200">
        Delete
    </button>
    );
}