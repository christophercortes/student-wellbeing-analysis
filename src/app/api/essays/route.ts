/*
The purpose of this file is to allow POST
and GET actions to be taken through an API
call. An example of this would be like this:
https://localhost3000/api/essays
*/

// Import the db connection, Essay model, and next response from the server
import connectMonDb from '@/config/database';
import Essay from '@/models/Essay';
import { NextResponse } from 'next/server';

// Export the POST route
export async function POST(request: Request)
{
    // Collect the data from the request and convert to a json
    // This could have problems so watch it
    const { student_id, course_id, vaderData } = await request.json();
    // Attempt to connect to the database
    await connectMonDb();

    // Go through with the post and attept to save the data
    try
    {
        // Add the new data to the database
        await Essay.create({ student_id, course_id, vaderData });
        // Return the success response if it worked
        return NextResponse.json({ message: "Essay created" }, { status: 201 });
    } catch (error) {
        // Display the error to the console
        console.error("An Error Occured: ", error);
        // Return the failure response
        return NextResponse.json({ message: "Server Error" }, { status: 500 });
    }
}

// Export the Get (All) route
export async function GET()
{
    // Connect to the database
    await connectMonDb();

    // Gather all the entries
    try 
    {
        // Try to grab all the data
        const essays = await Essay.find();
        // Return the success message
        return NextResponse.json({ essays }, { status: 200 });
    } catch (error) {
        // Display the error to the console
        console.error("An Error Occured: ", error);
        // Return the failure response
        return NextResponse.json({ message: "Server Error" }, { status: 500 });
    }
}