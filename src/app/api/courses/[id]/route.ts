/*
The purpose of this file is to handle api requests with
a specific id attached to them. For example this would
be a url request like this:

https://localhost3000/api/courses/[id]

or

https://localhost3000/api/courses/682e36436d63526097a78fa1

This way put and delete can be put in here, and also
a get that can get one course by it's id being in
the url.
*/

// Import the db connection for the api route
import connectMonDb from "@/config/database";
// Import the mongoose model
import Course from "@/models/Course";
// Import next response from the server
import { NextResponse } from "next/server";


// Export the PUT function
export async function PUT(request: Request, { params }: { params: { [key: string]: string | string[] } })
{
    // Obtain the id from the params being passed in
    const { id } = params;
    // Obtain the updated course data
    const { newCourseName: courseName, 
            newCourseCode: courseCode, 
            newDescription: description, 
            newDurationInWeeks: durationInWeeks, 
            newTeacher: teacher, 
            newIsActive: isActive } = await request.json();
    // Connect to the db
    await connectMonDb();

    // Now try to preform the update
    try
    {
        // Update the course based on the course id
        const updated = await Course.findByIdAndUpdate(
            id, 
            { courseName, courseCode, description, durationInWeeks, teacher, isActive }
        );
        
        // Return a message based on success or not
        if (!updated)
        {
            // Return the not found error, 404: Course Not Found
            return NextResponse.json({ message: "Course Not Found" }, { status: 404 });
        } else {
            // Return the success message, 200: Course Updated
            return NextResponse.json({ message: "Course Updated" }, { status: 200 });
        }
    } catch (error) {
        // Return the error message, 500: Server Error
        return NextResponse.json({ message: "Server Error" }, { status: 500 });
    }
}

// Export the DELETE function
export async function DELETE(_request: Request, { params }: { params: { [key: string]: string | string[] } })
{
    // Obtain the id from the url
    const { id } = params;
    // Connect to the db
    await connectMonDb();

    // Try to delete the course from the db using the id
    try 
    {
        // Delete the course from the db
        const deleted = await Course.findByIdAndDelete(id);

        // Return success message based on if the id could be found
        if (deleted)
        {
            // The course was deleted from the db, 200: Course Deleted
            return NextResponse.json({ message: "Course Deleted" }, { status: 200 });
        } else {
            // The course was not found in the db, 404: Student Not Found
            return NextResponse.json({ message: "Course Not Found" }, { status: 404 });
        }
    } catch (error) {
        // Return the error message, 500: Server Error
        return NextResponse.json({ message: "Server Error" }, { status: 500 });
    }
}

// Export the GET (by id) function
export async function GET(_request: Request, { params }: { params: { [key: string]: string | string[] } }) 
{
    // Obtain the id from the url
    const { id } = params;
    // Connect to the db
    await connectMonDb();

    // Try to find the course by id
    try 
    {
        // Find the course by id
        const course = await Course.findById(id);

        // Return message based on if the course could be found or not
        if (!course) 
        {
            // The course was not found in the db, 404: Course Not Found
            return NextResponse.json({ message: "Course Not Found" }, { status: 404 });
        } else {
            // The course was found in the db, 200: course
            return NextResponse.json({ course }, { status: 200 });
        }
    } catch (error) {
        // Return error message, 500: Server Error
        return NextResponse.json({ message: "Server Error" }, { status: 500 });
    }
}