/*
The purpose of this file is to allow POST
actions to be taken through the API to upload
images to the database. An example of this would
be like this:
http://localhost3000/api/images/upload
*/

// Import the db connection, Image model, next response, and formitable
import connectMonDB from '@/config/database';
import Image from '@/models/Image';
import { NextResponse } from 'next/server';

// Check if file is an image
const isImage = async (file: File) => {
    // Check to see if the file contains image routes
    const acceptedImageTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'];
    return acceptedImageTypes.includes(file.type);
}

// Export the POST route
export async function POST(request: Request)
{
    try
    {
        // Obtain the data from the request
        const data = await request.formData();

        // Connect to the db
        await connectMonDB();

        // Get the file from the data
        const file: File = data.get('file') as File;

        // Check to see if file can be obtained
        if (!file)
        {
            // Return an error message because no file exsists
            // in resquest
            return NextResponse.json({ message: "Request did not contain a file." }, { status: 415 });
        }

        // Create a variable to hold if the file is an image
        const fileIsImage = await isImage(file);

        // Check to see if it is a valid file type
        if (!fileIsImage)
        {
            // If it returns false then let the user
            // know the file is wrong
            return NextResponse.json({ message: "File is not an image file." }, { status: 415 });
        }

        // Buffer the data
        const bufferData = await file.arrayBuffer();
        const buffer = Buffer.from(bufferData);

        // Save the data to the database
        const savedImage = await Image.create({ name: file.name, data: buffer, contentType: file.type });

        // Return the success response
        return NextResponse.json({ id: savedImage.id }, { status: 201 }); // Return the image id so you can obtain the id for student or teacher.
    } catch (error) {
        // Display the error to the console
        console.error("An Error Occured: ", error);
        // Return the failure message, 500: Server Error
        return NextResponse.json({ message: "Server Error" }, { status: 500 });
    }
}