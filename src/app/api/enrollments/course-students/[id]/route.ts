/*
The purpose of this file is to handle api requests to
find the students enrolled in a specific course using the
course id. 
For example this would be called in a url request like this:

https://localhost3000/api/enrollments/course-students/[id]

or

https://localhost3000/api/enrollments/course-students/682e36436d63526097a78fa1

*/

// Import the db connection, Enrollment model, and next response from the server
import connectMonDb from '@/config/database';
import Enrollment from '@/models/Enrollment';
import { NextResponse } from 'next/server';

// Get the students ids from the selected course id
export async function GET(_request: Request, { params }: { params: Promise<{id: string}> })
{
    // Obtain the course id from the request
    const { id } = await params;
    // Connect to the database
    await connectMonDb();

    // Try to gather all the data from the database
    try 
    {
        // Obtain the data
        const enrollments = await Enrollment.find({ course_id: id });

        // Test to see if the result is empty, if it is then let the user know
        if (enrollments.length == 0)
        {
            // Return a error, nothing could be found
            return NextResponse.json({ message: "Enrollment Not Found" }, { status: 404 });
        } else {
            // Return the result and success message
            return NextResponse.json({ enrollments }, { status: 200 });
        }
    } catch (error) {
        // Display the error to the console
        console.error("An Error Occured: ", error);
        // Return the error message
        return NextResponse.json({ message: "Server Error" }, { status: 500 });
    }
}