// Required Imports
import EditCourseForm from "@/components/dashboard/course-management/EditCourseForm";

// Obtain the course from the db
const getCourseById = async (id: string) => {
    // Attempt to connect
    try 
    {
        // Connect to the db
        const response = await fetch(`${ process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api/students" }/api/courses/${id}`, {
            cache: "no-store", // Don't save the cache into the browser
        });

        if (!response.ok) 
        {
            // Throw Error if course can't be obtained
            throw new Error("Failed to fetch Course");
        }

        // Return the data
        return response.json();
    } catch (error) {
        // Log the error
        console.log(error);
    }
}

// Export the page for viewer
export default async function EditCourse({ params, }: { params: Promise<{ id: string }>; })
{
    // Obtain the id from the url
    const { id } = await params;

    // Get the data
    const { course } = await getCourseById(id);

    // Split up the data into varibles
    const { courseName, courseCode, description, durationInWeeks, isActive } = course;

    // Return the StudentForm
    return (<EditCourseForm 
        id={ id } 
        courseName={ courseName } 
        courseCode={ courseCode } 
        description={ description } 
        durationInWeeks={ durationInWeeks } 
        isActive={ isActive } 
        />);
}