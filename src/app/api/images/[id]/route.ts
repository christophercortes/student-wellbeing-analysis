/*
The purpose of this file is to allow DELETE by id
actions to be taken through the API to upload
images to the database. An example of this would
be like this:
http://localhost3000/api/images/{id}
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

// Export DELETE -- By id function
export async function DELETE(_request: Request, { params }: { params: Promise<{id: string}> }) 
{
    // Obtain the id from the request
    const { id } = await params;

    // Connect to the db
    await connectMonDB();

    try
    {
        // Get the image by id
        const deleted = await Image.findByIdAndDelete(id);

        // Test to see if the id exsists
        if (deleted)
        {
            // The image was found in the db
            return NextResponse.json({ message: "Image Deleted" }, { status: 200 });
        } else {
            // The image was not found in the db
            return NextResponse.json({ message: "Image Not Found" }, { status: 404 });
        }
    } catch (error) {
        // Display the error to the console
        console.error("An Error Occured: ", error);
        // Return error message
        return NextResponse.json({ message: "Server Error" }, { status: 500 });
    }
}

// Export the PUT function
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> })
{
    try
    {
    // Take the id from the request and obtain the file from the request
    const { id } = await params;

    const updateData = await request.formData();

    // Connect to the db
    await connectMonDB();

    const updateFile: File = updateData.get('updateFile') as File; // This is fine because this will always be a file
    
    // Check to see if file can be obtained
    if (!updateFile)
    {
        // Return an error message
        return NextResponse.json({ message: "Request did not contain a file" }, { status: 415 });
    }

    const updateFileIsImage = await isImage(updateFile);

    if (!updateFileIsImage)
    {
        // Return the error message
        return NextResponse.json({ message: "File is not an image file." }, { status: 415 });
    }

    // Buffer the data for saving into the db
    const bufferData = await updateFile.arrayBuffer();
    const buffer = Buffer.from(bufferData);

    // Update the data
    const updated = await Image.findByIdAndUpdate(
        id,
        { name: updateFile.name, data: buffer, contentType: updateFile.type }
    );

    // Return the message based on what went down
    if (!updated)
    {
        return NextResponse.json({ message: "Image Not Found" }, { status: 404 });
    } else {
        return NextResponse.json({ message: "Image Updated" }, { status: 200 });
    }
    } catch (error) {
        console.error("An Error Occured: ", error);
        return NextResponse.json({ message: "Server Error" }, { status: 500 });
    }
}