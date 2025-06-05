// Imports
import { CourseResponse } from "@/global/courseResponse";
import Link from "next/link";

// Export the page
export default async function Page() 
{
    // Obtain the Courses from the API
    async function getCourses() 
    {
        // Put a try here for safety
        try 
        {
            const response = await fetch(`${ process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000" }/api/courses`,
                { cache: "no-store" }
            );

            if (!response.ok)
            {
                // Throw the error
                throw new Error("Error fetching courses");
            }

            // If everything is ok return the data
            const data = await response.json();
            return (data.courses as CourseResponse[]) || [];
        } catch (error) {
            // Display the error to console
            console.error(error);
            return [];
        }
    }

    // Get the courses from the function
    const courses = await getCourses();

    // Display if active or not
    const isActiveCourse = (isActive: Boolean) => {
        // If it is active return string 'active'
        if (isActive)
        {
            return ('Active');
        } else {
            // If not return string 'not active'
            return ('Not Active');
        }

    }

    // Return the page
    return (
        <>
            <div className="flex m-5">
				<button className="bg-blue-300 shrink text-sm text-gray-700 py-3 px-6 border px-8 py-2 hover:bg-blue-400 hover:text-white">
					<Link
					href={"/dashboard/student-management/student/create"}
					>
						Create Student
					</Link>
				</button>
			</div>
			<h2 className="mt-8 text-lg font-semibold text-center">Management</h2>
			<table className="mt-9 w-3/5 mx-auto table-auto border-collapse text-sm">
				<thead>
					<tr className="border-b border-gray-200">
						<th className=" table-title">Name</th>
						<th className="table-title">Code</th>
						<th className="table-title">Duration</th>
						<th className="table-title">Active</th>
					</tr>
				</thead>
				<tbody>
					{courses.map((course) => {
						return (
							<tr className="border-b border-gray-200" key={course._id}>
								
								<td className="table-title py-3">
									<Link
									href={`/dashboard/course-management/course/${course._id}`}
									className="hover:bg-gray-100"
									>
										{course.courseName}
									</Link>
								</td>
								<td className="table-title py-3">{course.courseCode}</td>
								<td className="table-title py-3">{`${course.durationInWeeks} Weeks`}</td>
								<td className="table-title py-3 hidden lg:table-cell">{isActiveCourse(course.isActive)}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
        </>
    );
}