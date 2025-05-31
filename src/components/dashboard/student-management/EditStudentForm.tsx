// Use Client
"use client";

// Imports
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

// Export the form for the page
export default function EditStudentForm({ 
    id, 
    fullName, 
    dateOfBirth, 
    courseName, 
    teacherName, 
    contactInfo, 
    parentName, 
    parentEmail }: 
    {id: string; 
        fullName: string; 
        dateOfBirth: Date; 
        courseName: string; 
        teacherName: string; 
        contactInfo: string; 
        parentName: string; 
        parentEmail: string;})
{
    // Function to convert the date
    const convertDate = () => {
        // Create a Date object
        const date = new Date(dateOfBirth);
        // Create the proper string
        const year  = (date.getFullYear());
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day   = ((date.getDate() + 1).toString().padStart(2, "0"));

        const stringDate = `${year}-${month}-${day}`;
        // Return the date
        return stringDate;
    }

    // Hold the stringDate
    const convDateOfBirth: string = convertDate();

    // Variables to hold the new updated data
    const [newFullName, setNewFullName] = useState(fullName); // They defaut to the original values
    const [newDateOfBirth, setNewDateOfBirth] = useState(convDateOfBirth);
    const [newCourseName, setNewCourseName] = useState(courseName);
    const [newTeacherName, setNewTeacherName] = useState(teacherName);
    const [newContactInfo, setNewContactInfo] = useState(contactInfo);
    const [newParentName, setNewParentName] = useState(parentName);
    const [newParentEmail, setNewParentEmail] = useState(parentEmail);

    // Router to return to the student managment page after successful update
    const router = useRouter();

    // Function to see if an email is a valid email
    function isValidEmail(email: string)
    {
        // The regex to test the email
        const emailTestRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // Return true or false if the email passed or failed
        return emailTestRegex.test(email);
    }

    // Function to handle submit
    const handleSubmit = async (e: FormEvent) => {
        // Prevent the default action of the page reloading
        // This allows the filled in form elements to stay on screen
        // during a failed submit
        e.preventDefault();

        // Hold the final alert string
        let alertMessage: string = "";

        // Send an alert if a field is not filled, check through each field and generate message
        if (!newFullName)
        {
            // Add message to alert
            alertMessage += "Full Name is required.\n";
        }

        if (!newDateOfBirth)
        {
            alertMessage += "Date of Birth is required.\n";
        }

        if (!newCourseName)
        {
            alertMessage += "Course Name is required.\n";
        }

        if (!newTeacherName)
        {
            alertMessage += "Teacher Name is required.\n";
        }

        if (!newContactInfo)
        {
            alertMessage += "Contact Information is required.\n";
        }

        if (!newParentName) 
        {
            alertMessage += "Parent Name is required.\n";
        }

        if (!newParentEmail)
        {
            alertMessage += "Parent Email is required.\n";
        } else {
            // Other tests that are done on the fields
            // Test if email is valid.
            if (!isValidEmail(newParentEmail))
            {
                // If it comes back false, then add to the alertMessage
                alertMessage += "Parent Email must be a valid email.\n";
            }
        }

        // If the alertMessage is not empty throw the alert
        if (alertMessage != "")
        {
            // Toss the alert to the user to fix the fields
            alert(alertMessage);
        } else {
            // Do the other code if everything is fine
            // Try to hook to the db and add the student
            try
            {
                // Connect to the db
                const res = await fetch( 
                    `${ process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api/students" }/api/students/${id}`, 
                    {
                        method: "PUT",
                        headers: 
                        {
                            "Content-type": "application/json",
                        },
                        body: JSON.stringify({ newFullName, 
                            newDateOfBirth, 
                            newCourseName, 
                            newTeacherName, 
                            newContactInfo, 
                            newParentName, 
                            newParentEmail }),
                    });
                
                // If res is not ok
                if (!res.ok)
                {
                    // Throw new error letting us know we were not able to create a student
                    throw new Error("Failed to update student.");
                }

                // Refresh the router to show the update with out having the user refresh the browser
                router.refresh();
                // Push back to the student managment page
                router.push('/dashboard/student-management');
            } catch (error) {
                // Log the error
                console.log(error);
            }
        }
    }

    // Return the form
    return (<>
        <h2 className="mt-8 text-lg font-semibold text-center text-gray-700">Update Student</h2>
        <div className="flex justify-center items-center">
            <form onSubmit={ handleSubmit } className="flex flex-col gap-3 px-8 py-2 mt-9 w-3/5 justify-center">
                <div className="border px-8 py-2">
                    <label 
                        className="block mb-2 text-sm font-medium text-gray-700"
                    >Full Name:</label>
                    <input
                        onChange={ (e) => setNewFullName(e.target.value) }
                        value={ newFullName }
                        className="border rounded px-3 py-2 w-full text-gray-700" 
                        type="text" 
                        placeholder="Enter Student Full Name"
                    ></input>
                </div>
                <div className="border px-8 py-2">
                    <label 
                        className="block mb-2 text-sm font-medium text-gray-700"
                    >Date of Birth:</label>
                    <input
                        onChange={ (e) => setNewDateOfBirth(e.target.value) }
                        value={ newDateOfBirth }
                        className="border rounded px-3 py-2 w-full text-gray-700" 
                        type="date"
                    ></input>
                </div>
                <div className="border px-8 py-2">
                    <label 
                        className="block mb-2 text-sm font-medium text-gray-700"
                    >Course Name:</label>
                    <input
                        onChange={ (e) => setNewCourseName(e.target.value) }
                        value={ newCourseName }  
                        className="border rounded px-3 py-2 w-full text-gray-700" 
                        type="text" 
                        placeholder="Enter Course"
                    ></input>
                </div>
                <div className="border px-8 py-2">
                    <label 
                        className="block mb-2 text-sm font-medium text-gray-700"
                    >Teacher Name:</label>
                    <input
                        onChange={ (e) => setNewTeacherName(e.target.value) }
                        value={ newTeacherName }  
                        className="border rounded px-3 py-2 w-full text-gray-700" 
                        type="text" 
                        placeholder="Enter Teacher"
                    ></input>
                </div>
                <div className="border px-8 py-2">
                    <label 
                        className="block mb-2 text-sm font-medium text-gray-700"
                    >Contact Info:</label>
                    <input
                        onChange={ (e) => setNewContactInfo(e.target.value) }
                        value={ newContactInfo }  
                        className="border rounded px-3 py-2 w-full text-gray-700" 
                        type="text" 
                        placeholder="Enter Student Contact Info"
                    ></input>
                </div>
                <div className="border px-8 py-2">
                    <label 
                        className="block mb-2 text-sm font-medium text-gray-700"
                    >Parent Name:</label>
                    <input
                        onChange={ (e) => setNewParentName(e.target.value) }
                        value={ newParentName }  
                        className="border rounded px-3 py-2 w-full text-gray-700" 
                        type="text" 
                        placeholder="Enter Student Parent Name"
                    ></input>
                </div>
                <div className="border px-8 py-2">
                    <label 
                        className="block mb-2 text-sm font-medium text-gray-700"
                    >Parent Email:</label>
                    <input
                        onChange={ (e) => setNewParentEmail(e.target.value) }
                        value={ newParentEmail }
                        className="border rounded px-3 py-2 w-full text-gray-700" 
                        type="email" 
                        placeholder="Enter Parent Email"
                    ></input>
                </div>
                <div>
                    <button className="bg-blue-300 shrink text-gray-700 py-3 px-6 w-fit border px-8 py-2 hover:bg-blue-400 hover:text-white" type="submit">Update Student</button>
                </div>
            </form>
        </div>
    </>);
}