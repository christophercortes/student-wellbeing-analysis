// Import the db connection for the api route
import connectMonDb from "@/config/database";
// Import the mongoose model
import Student from "@/models/Student";
// Import next response from the server
import { NextResponse } from "next/server";

// Export the POST route
export async function POST(request: any) 
{
    // Collect the data from the request and convert to json
    const { fullName, dateOfBirth, courseName, teacherName, contactInfo, parentName, parentEmail } = await request.json();
    // Connect to the database
    await connectMonDb();

    // Go through with the post, create the student
    try 
    {
        // Try to add the new student to the database
        await Student.create({ fullName, dateOfBirth, courseName, teacherName, contactInfo, parentName, parentEmail });
        // Return the success response if the student was added, 201: Student Created
        return NextResponse.json({ message: "Student Created" }, { status: 201 });
    } catch (error) {
        // Return the faluire message, 500: Server Error
        return NextResponse.json({ message: "Server Error" }, { status: 500 });
    }
}

// Export the GET route - This returns all students
export async function GET()
{
    // Connect to the database
    await connectMonDb();

    // Go through with the get, return all students
    try 
    {
        // Try to grab the students
        const students = await Student.find();
        // Return the students and success message, 200: students returned
        return NextResponse.json({ students }, { status: 200 });
    } catch (error) {
        // Return the faluire message, 500: Server Error
        return NextResponse.json({ message: "Server Error" }, { status: 500 });
    }
}