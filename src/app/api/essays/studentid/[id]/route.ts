/*
The purpose of this file is to handle api requests with
a specific student id attached to them. For example this would
be a url request like this:

https://localhost3000/api/essays/studentid/[id]

or

https://localhost3000/api/essays/studentid/682e36436d63526097a78fa1

*/

// Import the db connection, Essay model, and next response from the server
import connectMonDb from '@/config/database';
import Essay from '@/models/Essay';
import { NextResponse } from 'next/server';

// Export the Get all by student id function, this obtains all the essays written by a student
export async function GET(_request: Request, { params }: { params: Promise<{id: string}> })
{
    // Obtain the id
    const { id } = await params;
    // Connect to the db
    await connectMonDb();

    // Try to get all the Essays by a shared student id
    try
    {
        // Get the essays
        const essays = await Essay.find({ student_id: id });

        // Test to see if the id exsists
        if (essays.length == 0)
        {
            // None of the essays had this student id in the db
            return NextResponse.json({ message: "Student Id not found in Essays" }, { status: 404 });
        } else {
            // The essays were found
            return NextResponse.json({ essays }, { status: 200 });
        }
    } catch (error) {
        // Display the error to the console
        console.error("An Error Occured: ", error);
        // Return error message
        return NextResponse.json({ message: "Server Error" }, { status: 500 });
    }
}