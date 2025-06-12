// Use Client
"use client"

// Imports
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

// Function
export default function EditStudentAddImage({ id }: { id: string; })
{
    // Create the states
    const [file, setFile] = useState<File | null>(null);
    
    // Router
    const router = useRouter();

    // Function to handle submit
    const handleSubmit = async (e: FormEvent) => {
        // Prevent the default action of the page reloading
        // This allows the filled in form elements to stay on screen
        // during a failed submit
        e.preventDefault();

        // Hold the final alert string
        let alertMessage: string = "";

        // Send an alert if a field is not filled, check through each field and generate message
        if (!file)
        {
            // Add message to alert
            alertMessage += "File is required.\n";
        }

        // If the alertMessage is not empty throw the alert
        if (alertMessage != "")
        {
            // Toss the alert to the user to fix the fields
            alert(alertMessage);
        } else {
            // Do the other code if everything is fine
            // Try to hook to the db and update the image
            try
            {
                // Create new FormData
                const data = new FormData();

                // Append the file to the data
                data.append('file', file as File);
                // Connect to the db
                const res = await fetch( 
                    `${ process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000" }/api/images/upload`, 
                    {
                        method: "POST",
                        body: data,
                    });
                
                // If res is not ok
                if (!res.ok)
                {
                    // Throw new error letting us know we were not able to create a student
                    throw new Error("Failed to update student image.");
                } else {
                    // Obtain the id from the res
                    const { id: image_id } = await res.json();
                    // Now hook to the api to update the student
                    const secRes = await fetch( 
                    `${ process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000" }/api/students/${id}`, 
                    {
                        method: "PATCH",
                        headers: 
                        {
                            "Content-type": "application/json",
                        },
                        body: JSON.stringify({ image_id }),
                    });

                    if (!secRes)
                    {
                        // Throw new error letting us know we were not able to create a student
                        throw new Error("Failed to update student.");
                    } else {
                        // Refresh the router to show the update with out having the user refresh the browser
                        router.refresh();
                        // Push back to the student managment page
                        router.push('/dashboard/student-management');
                    }
                }
            } catch (error) {
                // Log the error
                console.log(error);
            }
        }
    }

    // Return the page
    return (<>
        <h2 className="mt-8 text-lg font-semibold text-center text-gray-700">Update Student Image</h2>
        <div className="flex flex-col m-5 justify-center items-center">
            <form onSubmit={ handleSubmit } className="flex flex-col gap-3 px-8 py-2 mt-9 w-3/5 justify-center">
                <div className="border border-gray-700 px-8 py-2">
                    <label 
                        className="block mb-2 text-sm font-medium text-gray-700"
                    >Add Image File:</label>
                    <input
                        type="file" 
                        name="file"
                        onChange={(e) => {
                            const files = e.target.files;
                            if (!files || files.length === 0)
                            {
                                setFile(null);
                            } else {
                                setFile(files[0]);
                            }
                        }}
                    ></input>
                </div>
                <div>
                    <p>Student currently does not have an image. Please add one.</p>
                </div>
                <div>
                    <button className="bg-blue-300 shrink text-gray-700 py-3 px-6 w-fit border px-8 py-2 hover:bg-blue-400 hover:text-white" type="submit">Update Image</button>
                </div>
                <div>
                    <Link className="text-blue-400 hover:text-blue-200 py-5" href={"/dashboard/student-management"}>Go Back</Link>
                </div>
            </form>
        </div>
    </>);
}