/*
The purpose of this file is to allow GET by id
actions to be taken through the API to upload
images to the database. An example of this would
be like this:
http://localhost3000/api/images/obtain/{id}
*/

// Import the db connection, Image model, next response, and formitable
import connectMonDB from '@/config/database';
import Image from '@/models/Image';
import { NextResponse } from 'next/server';

// Export GET -- By id function
export async function GET(_request: Request, { params }: { params: Promise<{id: string}> }) 
{
    // Obtain the id from the request
    const { id } = await params;

    // Connect to the db
    await connectMonDB();

    try
    {
        // Get the image by id
        const image = await Image.findById(id);

        // Test to see if the id exsists
        if (!image)
        {
            // The image was not found in the db
            return NextResponse.json({ message: "Image Not Found" }, { status: 404 });
        } else {
            // The image was found in the db
            return NextResponse.json({ image }, { status: 200 });
        }
    } catch (error) {
        // Display the error to the console
        console.error("An Error Occured: ", error);
        // Return error message
        return NextResponse.json({ message: "Server Error" }, { status: 500 });
    }
}