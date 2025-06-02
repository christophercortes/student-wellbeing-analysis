/*
The purpose of this file is to handle api requests with
a specific id attached to them. For example this would
be a url request like this:

https://localhost3000/api/enrollments/[id]

or

https://localhost3000/api/enrollments/682e36436d63526097a78fa1

This way put and delete can be put in here, and also
a get that can get one course by it's id being in
the url.
*/

// Import the db connection, Enrollment model, and next response from the server
import connectMonDb from '@/config/database';
import Enrollment from '@/models/Enrollment';
import { NextResponse } from 'next/server';

// Export the PUT function
export async function PUT(request: Request, { params }: { params: Promise<{id: string}> })
{
    // Obtain the id from the request
    const { id } = await params;

    // Obtain the updated course data
    const { newStudent_id: student_id, newCourse_id: course_id } = await request.json();

    // Connect to the database
    await connectMonDb();

    // Now try the update
    try 
    {
        // Update the db
        const updated = await Enrollment.findByIdAndUpdate(id, { student_id, course_id });

        // Check to see if the enrollment was found
        if (!updated)
        {
            // Return the error response
            return NextResponse.json({ message: "Enrollment Not Found" }, { status: 404 });
        } else {
            // Return the success message
            return NextResponse.json({ message: "Enrollment Updated" }, { status: 200 });
        }
    } catch (error) {
        // Display the error to the console
        console.error("An Error Occured: ", error);
        // Return the error message
        return NextResponse.json({ message: "Server Error" }, { status: 500 });
    }
}

// Export the Delete function
export async function DELETE(_request: Request, { params }: { params: Promise<{id: string}> })
{
    // Obtain the id from the request
    const { id } = await params;
    // Connect to the database
    await connectMonDb();

    // Try to delete the Enrollment from the db using the id
    try 
    {
        // Delete the Enrollment from the db
        const deleted = await Enrollment.findByIdAndDelete(id);

        // Return success message based on if the id could be found
        if (deleted)
        {
            // The Essay was deleted from the db
            return NextResponse.json({ message: "Enrollment Deleted" }, { status: 200 });
        } else {
            // The Essay was not found in the db
            return NextResponse.json({ message: "Enrollment Not Found" }, { status: 404 });
        }
    } catch (error) {
        // Display the error to the console
        console.error("An Error Occured: ", error);
        // Return the error message
        return NextResponse.json({ message: "Server Error" }, { status: 500 });
    }
}

// Export the Get by id function
export async function GET(_request: Request, { params }: { params: Promise<{id: string}> })
{
    // Obtain the id
    const { id } = await params;
    // Connect to the db
    await connectMonDb();

    // Try to get the Enrollment by it's id
    try
    {
        // Get the enrollment
        const essay = await Enrollment.findById(id);

        // Test to see if the id exsists
        if (!essay)
        {
            // The enrollment was not found in the db
            return NextResponse.json({ message: "Enrollment Not Found" }, { status: 404 });
        } else {
            // The enrollment was found in the db
            return NextResponse.json({ essay }, { status: 200 });
        }
    } catch (error) {
        // Display the error to the console
        console.error("An Error Occured: ", error);
        // Return error message
        return NextResponse.json({ message: "Server Error" }, { status: 500 });
    }
}