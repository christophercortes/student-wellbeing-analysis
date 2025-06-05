// Imports
import { CourseResponse } from "@/global/courseResponse";
import Link from "next/link";
import RemoveCourse from "@/components/dashboard/course-management/RemoveCourse";

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

    // Return the page
    return (
        <>
            <div className="flex m-5">
				<button className="bg-blue-300 shrink text-sm text-gray-700 py-3 px-6 border px-8 py-2 hover:bg-blue-400 hover:text-white">
					<Link
					href={"/dashboard/course-management/course/create"}
					>
						Create Course
					</Link>
				</button>
			</div>
			<h2 className="mt-8 text-lg font-semibold text-center">Management</h2>
			<table className="mt-9 w-3/5 mx-auto table-auto border-collapse text-sm">
				<thead>
					<tr className="border-b border-gray-200">
						<th className=" table-title">Name</th>
						<th className="table-title">Code</th>
						<th className="table-title hidden lg:table-cell">Duration</th>
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
								<td className="table-title py-3 hidden lg:table-cell">{`${course.durationInWeeks} ${weekDisplay(course.durationInWeeks)}`}</td>
								<td className="table-title py-3"><p className={activeColor(course.isActive)}>{isActiveCourse(course.isActive)}</p></td>
                                <td className="table-title py-3">
									<Link 
									href={`/dashboard/course-management/course/update/${course._id}`}
									className="text-blue-400 hover:text-blue-200"
									>
										Edit
									</Link>
								</td>
                                <td className="table-title py-3">
                                    <RemoveCourse id={course._id} courseName={course.courseName} />
                                </td>
							</tr>
						);
					})}
				</tbody>
			</table>
        </>
    );
}