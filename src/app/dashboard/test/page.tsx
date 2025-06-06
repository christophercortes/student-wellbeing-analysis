// Use client
'use client'

// Imports
import { FormEvent, useState } from 'react';

// Test file to test something.
export default function Page()
{
    // Create the states
    const [file, setFile] = useState<File | null>(null);

    // Handle on submit
    const handleSubmit = async (e: FormEvent) => {
        // Prevent the defualt action
        e.preventDefault();

        if (!file)
        {
            // Send alert telling user to select file
            alert('Please select a file.');
            return;
        }

        // Create new FormData to save the file
        const data = new FormData();

        // Append the file to the data
        data.append('file', file);

        // Try to save the file to mongoDB
        try
        {
            const res = await fetch(`${ process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000" }/api/images/upload`,
                {
                    method: "POST",
                    body: data,
                }
            );
            
            if (!res.ok) 
            {
                alert("File not uploaded");
            } else {
                alert("File uploaded correctly!");
            }
        } catch (error) {
            // Log the error
            console.log(error);
        }
    }

    // Return the yucky form
    return(<>
    <form onSubmit={ handleSubmit }>
        <label>Input file</label>
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
        <button 
            type="submit" 
            >Upload</button>
    </form>
    </>);
}