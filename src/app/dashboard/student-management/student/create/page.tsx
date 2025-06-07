// Mark this file as used by client to allow useState to work
"use client";

// Required Imports
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

// Export page for viewer
export default function AddStudent()
{
    // Functions to help maintain the form submit and set up
    const [fullName, setFullName] = useState(""); // By default the value will be blank
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [courseName, setCourseName] = useState("");
    const [teacherName, setTeacherName] = useState("");
    const [contactInfo, setContactInfo] = useState("");
    const [parentName, setParentName] = useState("");
    const [parentEmail, setParentEmail] = useState("");
    const [age, setAge] = useState(0);
    const [imageFile, setImageFile] = useState<File | null>(null);

    // Router to return to the student managment page after successful creation
    const router = useRouter();

    // Function to see if an email is a valid email
    function isValidEmail(email: string)
    {
        // The regex to test the email
        const emailTestRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // Return true or false if the email passed or failed
        return emailTestRegex.test(email);
    }

    // Function to save the file to the db
    async function saveFile(file: File)
    {
        if (!file)
        {
            // Send alert telling user to select file
            alert('Please select a file.');
            return;
        }

        // Create new FormData to save the file
        const data = new FormData();

        // Append the file to the data
        data.append('file', file);

        // Try to save the file to mongoDB
        try
        {
            const res = await fetch(`${ process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000" }/api/images/upload`,
                {
                    method: "POST",
                    body: data,
                }
            );
            
            if (!res.ok) 
            {
                alert("File not uploaded");
            } else {
                // Return the image id to be saved
                const { id } = await res.json();

                // Return the string id
                return (id);
            }
        } catch (error) {
            // Log the error
            console.log(error);
        }
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
        if (!fullName)
        {
            // Add message to alert
            alertMessage += "Full Name is required.\n";
        }

        if (!dateOfBirth)
        {
            alertMessage += "Date of Birth is required.\n";
        }

        if (!courseName)
        {
            alertMessage += "Course Name is required.\n";
        }

        if (!teacherName)
        {
            alertMessage += "Teacher Name is required.\n";
        }

        if (!contactInfo)
        {
            alertMessage += "Contact Information is required.\n";
        }

        if (!parentName) 
        {
            alertMessage += "Parent Name is required.\n";
        }

        if (!parentEmail)
        {
            alertMessage += "Parent Email is required.\n";
        } else {
            // Other tests that are done on the fields
            // Test if email is valid.
            if (!isValidEmail(parentEmail))
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
            // Create a variable to hold the id
            let image_id = "";
            // If all the other fields are ok, now try the file
            if (!imageFile)
            {
                // Set the image id to a blank string. Because the file was null.
                image_id = "";
            } else {
                // Save the file and obtain the id for saving
                image_id = await saveFile(imageFile as File);
            }
            // Do the other code if everything is fine
            // Try to hook to the db and add the student
            try
            {
                // Connect to the db
                const res = await fetch( `${ process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000" }/api/students`, 
                    {
                        method: "POST",
                        headers: 
                        {
                            "Content-type": "application/json",
                        },
                        body: JSON.stringify({ fullName, 
                            dateOfBirth, 
                            courseName, 
                            teacherName, 
                            contactInfo, 
                            parentName, 
                            parentEmail,
                            age,
                            image_id }),
                    });
                
                // If res is not ok
                if (!res.ok)
                {
                    // Throw new error letting us know we were not able to create a student
                    throw new Error("Failed to create new student.");
                }

                // Push back to the student managment page
                router.push('/dashboard/student-management');
            } catch (error) {
                // Log the error
                console.log(error);
            }
        }
    }

    // Return the page
    return (<>
        <h2 className="mt-8 text-lg font-semibold text-center text-gray-700">Create New Student</h2>
        <div className="flex justify-center items-center">
            <form onSubmit={ handleSubmit } className="flex flex-col gap-3 px-8 py-2 mt-9 w-3/5 justify-center">
                <div className="border border-gray-700 px-8 py-2">
                    <label 
                        className="block mb-2 text-sm font-medium text-gray-700"
                    >Full Name:</label>
                    <input
                        onChange={ (e) => setFullName(e.target.value) } // When this changes, set the value of the variable
                        value={ fullName } // This is equal to the state above 
                        className="border rounded px-3 py-2 w-full text-gray-700" 
                        type="text" 
                        placeholder="Enter Student Full Name"
                    ></input>
                </div>
                <div className="border border-gray-700 px-8 py-2">
                    <label 
                        className="block mb-2 text-sm font-medium text-gray-700"
                    >Date of Birth:</label>
                    <input
                        onChange={ (e) => {
                            // Work to update age
                            const birthDate = new Date(e.target.value);
                            const currentDate = new Date();

                            // Separate into two different groups of variables
                            const birthYear = birthDate.getFullYear();
                            const birthMonth = birthDate.getMonth() + 1;
                            const birthDay = birthDate.getDate() + 1;

                            const currentYear = currentDate.getFullYear();
                            const currentMonth = currentDate.getMonth() + 1;
                            const currentDay = currentDate.getDate();

                            let currentAge = currentYear - birthYear;

                            if (currentMonth < birthMonth || (currentMonth === birthMonth && currentDay < birthDay))
                            {
                                // Subtract from age because they are not a year older yet.
                                currentAge -= 1;
                            }
                            // Set the date on change, then update the age
                            setDateOfBirth(e.target.value);
                            setAge(currentAge);
                        } } 
                        value={ dateOfBirth }  
                        className="border rounded px-3 py-2 w-full text-gray-700" 
                        type="date"
                    ></input>
                </div>
                <div className="border border-gray-700 px-8 py-2">
                    <label 
                        className="block mb-2 text-sm font-medium text-gray-700"
                    >Course Name:</label>
                    <input
                        onChange={ (e) => setCourseName(e.target.value) } 
                        value={ courseName }   
                        className="border rounded px-3 py-2 w-full text-gray-700" 
                        type="text" 
                        placeholder="Enter Course"
                    ></input>
                </div>
                <div className="border border-gray-700 px-8 py-2">
                    <label 
                        className="block mb-2 text-sm font-medium text-gray-700"
                    >Teacher Name:</label>
                    <input
                        onChange={ (e) => setTeacherName(e.target.value) } 
                        value={ teacherName }   
                        className="border rounded px-3 py-2 w-full text-gray-700" 
                        type="text" 
                        placeholder="Enter Teacher"
                    ></input>
                </div>
                <div className="border border-gray-700 px-8 py-2">
                    <label 
                        className="block mb-2 text-sm font-medium text-gray-700"
                    >Contact Info:</label>
                    <input
                        onChange={ (e) => setContactInfo(e.target.value) } 
                        value={ contactInfo }   
                        className="border rounded px-3 py-2 w-full text-gray-700" 
                        type="text" 
                        placeholder="Enter Student Contact Info"
                    ></input>
                </div>
                <div className="border border-gray-700 px-8 py-2">
                    <label 
                        className="block mb-2 text-sm font-medium text-gray-700"
                    >Parent Name:</label>
                    <input
                        onChange={ (e) => setParentName(e.target.value) } 
                        value={ parentName }   
                        className="border rounded px-3 py-2 w-full text-gray-700" 
                        type="text" 
                        placeholder="Enter Student Parent Name"
                    ></input>
                </div>
                <div className="border border-gray-700 px-8 py-2">
                    <label 
                        className="block mb-2 text-sm font-medium text-gray-700"
                    >Parent Email:</label>
                    <input
                        onChange={ (e) => setParentEmail(e.target.value) } 
                        value={ parentEmail }   
                        className="border rounded px-3 py-2 w-full text-gray-700" 
                        type="email" 
                        placeholder="Enter Parent Email"
                    ></input>
                </div>
                <div className="border border-gray-700 px-8 py-2">
                    <label 
                        className="block mb-2 text-sm font-medium text-gray-700"
                    >Age:</label>
                    <input
                        value={ age }   
                        className="border rounded px-3 py-2 w-full text-gray-700" 
                        type="number" 
                        placeholder="Enter Age"
                        readOnly
                    ></input>
                </div>
                <div className="border border-gray-700 px-8 py-2">
                    <label 
                        className="block mb-2 text-sm font-medium text-gray-700"
                    >Image File:</label>
                    <input
                        onChange={(e) => {
                            const files = e.target.files;
                            if (!files || files.length === 0)
                            {
                                setImageFile(null);
                            } else {
                                setImageFile(files[0]);
                            }
                        }}   
                        className="border rounded px-3 py-2 w-full text-gray-700" 
                        type="file"
                    ></input>
                </div>
                <div>
                    <button className="bg-blue-300 shrink text-gray-700 py-3 px-6 w-fit border px-8 py-2 hover:bg-blue-400 hover:text-white" type="submit">Add Student</button>
                </div>
                <div>
                    <Link className="text-blue-400 hover:text-blue-200 py-5" href={"/dashboard/student-management"}>Go Back</Link>
                </div>
            </form>
        </div>
    </>);
}