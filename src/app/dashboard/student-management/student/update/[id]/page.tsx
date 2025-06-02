// Required Imports
import EditStudentForm from "@/components/dashboard/student-management/EditStudentForm";

// Obtain the student from the db
const getStudentById = async (id: string) => {
    // Attempt to connect
    try 
    {
        // Connect to the db
        const response = await fetch(`${ process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api/students" }/api/students/${id}`, {
            cache: "no-store", // Don't save the cache into the browser
        });

        if (!response.ok) 
        {
            // Throw Error if student can't be obtained
            throw new Error("Failed to fetch Student");
        }

        // Return the data
        return response.json();
    } catch (error) {
        // Log the error
        console.log(error);
    }
}

// Export the page for viewer
export default async function EditStudent({ params, }: { params: Promise<{ id: string }>; })
{
    // Obtain the id from the url
    const { id } = await params;

    // Get the data
    const { student } = await getStudentById(id);

    // Split up the data into varibles
    const { fullName, dateOfBirth, courseName, teacherName, contactInfo, parentName, parentEmail } = student;

    // Return the StudentForm
    return (<EditStudentForm 
        id={ id } 
        fullName={ fullName } 
        dateOfBirth={ dateOfBirth } 
        courseName={ courseName } 
        teacherName={ teacherName } 
        contactInfo={ contactInfo } 
        parentName={ parentName } 
        parentEmail={ parentEmail } 
        />);
}