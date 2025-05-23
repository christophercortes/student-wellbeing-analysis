/*
The purpose of this file is to handle api requests with
a specific id attached to them. For example this would
be a url request like this:

https://localhost3000/api/students/[id]

or

https://localhost3000/api/students/682e36436d63526097a78fa1

This way put and delete can be put in here, and also
a get that can get one student by their id being in
the url.
*/

// Import the db connection for the api route
import connectMonDb from "@/config/database";
// Import the mongoose model
import Student from "@/models/Student";
// Import next response from the server
import { NextResponse } from "next/server";


// Export the PUT function
export async function PUT(request: Request, { params }: { params: Promise<{id: string}> })
{
    // Obtain the id from the params being passed in
    const { id } = await params;
    // Obtain the updated student data
    const { newFullName: fullName, 
            newDateOfBirth: dateOfBirth, 
            newCourseName: courseName, 
            newTeacherName: teacherName, 
            newContactInfo: contactInfo, 
            newParentName: parentName, 
            newParentEmail: parentEmail } = await request.json();
    // Connect to the db
    await connectMonDb();

    // Now try to preform the update
    try
    {
        // Update the student based on the student id
        const updated = await Student.findByIdAndUpdate(
            id, 
            { fullName, dateOfBirth, courseName, teacherName, contactInfo, parentName, parentEmail }
        );
        
        // Return a message based on success or not
        if (!updated)
        {
            // Return the not found error, 404: Student Not Found
            return NextResponse.json({ message: "Student Not Found" }, { status: 404 });
        } else {
            // Return the success message, 200: Student Updated
            return NextResponse.json({ message: "Student Updated" }, { status: 200 });
        }
    } catch (error) {
        // Display the error to the console
        console.error("An Error Occured: ", error);
        // Return the error message, 500: Server Error
        return NextResponse.json({ message: "Server Error" }, { status: 500 });
    }
}

// Export the DELETE function
export async function DELETE(_request: Request, { params }: { params: Promise<{id: string}> }) // _request instead of request fixes a warning
{
    // Obtain the id from the url
    const { id } = await params;
    // Connect to the db
    await connectMonDb();

    // Try to delete the student from the db using the id
    try 
    {
        // Delete the student from the db
        const deleted = await Student.findByIdAndDelete(id);

        // Return success message based on if the id could be found
        if (deleted)
        {
            // The student was deleted from the db, 200: Student Deleted
            return NextResponse.json({ message: "Student Deleted" }, { status: 200 });
        } else {
            // The student was not found in the db, 404: Student Not Found
            return NextResponse.json({ message: "Student Not Found" }, { status: 404 });
        }
    } catch (error) {
        // Display the error to the console
        console.error("An Error Occured: ", error);
        // Return the error message, 500: Server Error
        return NextResponse.json({ message: "Server Error" }, { status: 500 });
    }
}

// Export the GET (by id) function
export async function GET(_request: Request, { params }: { params: Promise<{id: string}> }) 
{
    // Obtain the id from the url
    const { id } = await params;
    // Connect to the db
    await connectMonDb();

    // Try to find the student by id
    try 
    {
        // Find the student by id
        const student = await Student.findById(id);

        // Return message based on if the student could be found or not
        if (!student) 
        {
            // The student was not found in the db, 404: Student Not Found
            return NextResponse.json({ message: "Student Not Found" }, { status: 404 });
        } else {
            // The student was found in the db, 200: student
            return NextResponse.json({ student }, { status: 200 });
        }
    } catch (error) {
        // Display the error to the console
        console.error("An Error Occured: ", error);
        // Return error message, 500: Server Error
        return NextResponse.json({ message: "Server Error" }, { status: 500 });
    }
}