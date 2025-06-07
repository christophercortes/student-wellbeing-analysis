// imports
import EditStudentImageAdd from "@/components/dashboard/student-management/EditStudentImageAdd";

// Function to display to the viewer
export default async function EditStudentAddImage({ params, }: { params: Promise<{ id: string }>; }) // Pass in the student
{
    // Obtain the id from the params
    const { id } = await params;

    // Return the form
    return (<EditStudentImageAdd id={ id } />)
}