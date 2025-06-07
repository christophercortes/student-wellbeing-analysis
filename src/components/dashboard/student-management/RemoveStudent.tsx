// Use Client
"use client"

// Imports
import { useRouter } from "next/navigation";

// Function that removes the student
export default function RemoveStudent({ id, fullName, image_id }: { id: string; fullName: string; image_id: string; }) 
{
    // Create a router to reload the page after the action was completed
    const router = useRouter();

    // Remove the student
    const removeTheStudentFormDb = async () => {
        // Check to make sure the user is sure they want to remove the student
        const confirmed = confirm(`Are you sure you want to delete ${fullName}?`);

        // If they say yes
        if (confirmed)
        {
            try
            {
                // Connect to the api and delete the student
                const res = await fetch( 
                        `${ process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000" }/api/students/${id}`, 
                        {
                            method: "DELETE",
                        }
                );

                if (res.ok)
                {
                    // Now delete the student image if there was one
                    if (image_id.length > 0)
                    {
                        const secRes = await fetch( 
                            `${ process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000" }/api/images/${image_id}`, 
                            {
                                method: "DELETE",
                            }
                        );

                        if (!secRes.ok)
                        {
                            // Throw an error
                            throw new Error("Could not delete Student Image.");
                        }
                    }
                    // Refresh the page
                    router.refresh();
                } else {
                    // Throw an error
                    throw new Error("Could not delete student.");
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