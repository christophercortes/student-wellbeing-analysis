/*
The purpose of this file is to allow GET all
actions to be taken through the API to upload
images to the database. An example of this would
be like this:
http://localhost3000/api/images

This data is just for testing and does not return much you can view.
*/

// Import the db connection, Image model, next response, and formitable
import connectMonDB from '@/config/database';
import Image from '@/models/Image';
import { NextResponse } from 'next/server';

// Export the GET route - This returns all images
export async function GET()
{
    // Connect to the database
    await connectMonDB();

    // Go through with the get, return all images
    try 
    {
        // Try to grab the images
        const images = await Image.find();
        // Return the images and success message, 200: images returned
        return NextResponse.json({ images }, { status: 200 });
    } catch (error) {
        // Display the error to the console
        console.error("An Error Occured: ", error);
        // Return the faluire message, 500: Server Error
        return NextResponse.json({ message: "Server Error" }, { status: 500 });
    }
}


// Export Delete All
export async function DELETE()
{
    // Delete all data from the db for testing
    // Connect to the db
    await connectMonDB();

    // Try the function
    try
    {
        // Delete the data.
        await Image.deleteMany({});

        // Send the success response.
        return NextResponse.json({ message: "Images Deleted" }, { status: 200 });
    } catch (error) {
        // Display the error to the console
        console.error("An Error Occured: ", error);
        // Return the failure message, 500: Server Error
        return NextResponse.json({ message: "Server Error" }, { status: 500 }); 
    }
}