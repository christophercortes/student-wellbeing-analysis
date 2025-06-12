// Imports
import Link from 'next/link';

// Export the page to the user to see it
export default async function Page ({params,}: {params: Promise<{ id: string }>;})
{
    // Save the id from the params as a usable variable
    const { id } = await params;

    // Obtain the course from the db
    const getCourse = async (id: string) => {
        // Try to connect to the db
        try 
        {
            const response = await fetch(`${ process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000" }/api/courses/${id}`,
                { cache: "no-cache" }
            );
            // If the student does not exisit
            if (!response.ok)
            {
                return ('');
            } else {
                // Return the student data as a json.
                return (await response.json())
            }
        } catch (error) {
            console.log(error);
        }
    }

    // Display if active or not
    const isActiveCourse = (isActive: boolean) => {
        // If it is active return string 'active'
        if (isActive)
        {
            return ('Active');
        } else {
            // If not return string 'not active'
            return ('Not Active');
        }

    }

    // Change the display of the active status color
    const activeColor = (isActive: boolean) => {
        // If it is active the color is green
        if (isActive)
        {
            return ('text-green-400');
        } else {
            // if the course is not active
            return ('text-red-600');
        }
    }

    // Display weeks properly
    const weekDisplay = (weekAmount: number) => {
        // If it is 1 send a different string
        if (weekAmount === 1)
        {
            return ('Week');
        } else {
            return ('Weeks');
        }
    }

    // Save the course data to a variable
    const { course } = await getCourse(id);

    // Return the result based on what is obtained
    if (!course) {
        // Return the could not find course div
        return (<><div className="text-center mt-8">Course not found</div></>);
    } else {
        // Return the course data for the viewer
        return (
        <>
            <div className="container mx-auto px-4 py-8">
                <h2 className="text-2xl font-semibold mb-6">Course Details</h2>
                <div className="bg-white shadow-md rounded-lg p-6">
                    <div className="grid grid-cols-1 text-center sm:text-left sm:grid-cols-2 gap-4">
                        <div>
                            <p className="font-semibold">Course Name:</p>
                            <p>{course.courseName}</p>
                        </div>
                        <div>
                            <p className="font-semibold">Course Code:</p>
                            <p>{course.courseCode}</p>
                        </div>
                        <div>
                            <p className="font-semibold">Description:</p>
                            <p>{course.description}</p>
                        </div>
                        <div>
                            <p className="font-semibold">Duration</p>
                            <p>{`${course.durationInWeeks} ${weekDisplay(course.durationInWeeks)}`}</p>
                        </div>
                        <div>
                            <p className="font-semibold">Active:</p>
                            <p className={activeColor(course.isActive)}>{isActiveCourse(course.isActive)}</p>
                        </div>
                    </div>
                </div>
                <div className="mt-8">
                    <Link className="text-blue-400 hover:text-blue-200 py-5" href={"/dashboard/course-management"}>Go Back</Link>
                </div>
		    </div>
        </>
        );
    }
}