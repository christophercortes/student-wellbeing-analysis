"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function UploadForm ({ id, }: { id: string }) 
{
    const [imageFile, setImageFile] = useState<File | null>(null);

    // Router
    const router = useRouter();

    // Check if file is an image
    const isImage = (file: File) => {
        // Check to see if the file contains image routes
        const acceptedImageTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'];
        return acceptedImageTypes.includes(file.type);
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        let alertMessage: string = "";

        if (!imageFile)
        {
            alertMessage += "File is required.\n";
        } else {
            // Test to see if the file is an image file
            if (!isImage(imageFile))
            {
                alertMessage += "File must me an image file.\n";
            }
        } 

        // Check to see if the alertmessage is populated
        if (alertMessage != "")
        {
            alert(alertMessage);
        } else {
            // Upload the picture to the teacher
            const profilePicData = new FormData();

            profilePicData.append('file', imageFile as File);
            profilePicData.append('teacherId', id);

            // Connect to the db
            try{
                const res = await fetch( 
                    `${ process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000" }/api/teachers/uploadPhoto`, 
                    {
                        method: "POST",
                        body: profilePicData,
                    });
                
                // If res is not ok
                if (!res.ok)
                {
                    // Throw new error letting us know we were not able to create a student
                    throw new Error("Failed to update student.");
                }

                // Refresh the router to show the update with out having the user refresh the browser
                router.refresh();
                // Push back to the student managment page
                router.push('/dashboard/user-profile');
            } catch (error) {
                // Log the error
                console.log(error);
            }
        }
    }
    
    return (<>
        <div className="flex justify-center items-center">
            <form onSubmit={ handleSubmit } className="flex flex-col gap-3 px-8 py-2 mt-9 w-3/5 justify-center">
                <div className="border border-gray-700 px-8 py-2">
                    <label 
                        className="block mb-2 text-sm font-medium text-gray-700"
                    >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg
                                className="w-8 h-8 mb-4 text-gray-500"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 16"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                />
                            </svg>
                            <p className="mb-2 text-sm text-gray-500">
                                <span className="font-semibold">Click to upload</span> or drag and
                                drop
                            </p>
					    </div>
                        <input
                            onChange={(e) => {
                                const files = e.target.files;
                                if (!files || files.length === 0)
                                {
                                    setImageFile(null);
                                } else {
                                    setImageFile(files[0]);
                                }
                            }}   
                            className="hidden" 
                            type="file"
                        ></input>
                    </label>
                    {imageFile && (<p className="mt-2 text-sm text-gray-500 text-center">Selected file: {imageFile.name}</p>)}
                </div>
                <div>
                    <button className="bg-blue-300 shrink text-gray-700 py-3 px-6 w-fit border px-8 py-2 hover:bg-blue-400 hover:text-white" type="submit">Upload Picture</button>
                </div>
                <div>
                    <Link className="text-blue-400 hover:text-blue-200 py-5" href={"/dashboard/user-profile"}>Go Back</Link>
                </div>
            </form>
        </div>
    </>);
}