/*
The purpose of this file is to allow POST
and GET actions to be taken through an API
call. An example of this would be like this:
https://localhost3000/api/courses
*/

// Import the db connection for the api route
import connectMonDb from "@/config/database";
// Import the mongoose model
import Course from "@/models/Course";
// Import next response from the server
import { NextResponse } from "next/server";

// Export the POST route
export async function POST(request: Request) 
{
    // Collect the data from the request and convert to json
    const { courseName, courseCode, description, durationInWeeks, isActive } = await request.json();
    // Connect to the database
    await connectMonDb();

    // Go through with the post, create the Course
    try 
    {
        // Try to add the new course to the database
        await Course.create({ courseName, courseCode, description, durationInWeeks, isActive });
        // Return the success response if the course was added, 201: Course Created
        return NextResponse.json({ message: "Course Created" }, { status: 201 });
    } catch (error) {
        // Display the error to the console
        console.error("An Error Occured: ", error);
        // Return the faluire message, 500: Server Error
        return NextResponse.json({ message: "Server Error" }, { status: 500 });
    }
}

// Export the GET route - This returns all courses
export async function GET()
{
    // Connect to the database
    await connectMonDb();

    // Go through with the get, return all courses
    try 
    {
        // Try to grab the courses
        const courses = await Course.find();
        // Return the courses and success message, 200: courses returned
        return NextResponse.json({ courses }, { status: 200 });
    } catch (error) {
        // Display the error to the console
        console.error("An Error Occured: ", error);
        // Return the faluire message, 500: Server Error
        return NextResponse.json({ message: "Server Error" }, { status: 500 });
    }
}