// Mark this file as used by client to allow useState to work
"use client";

// Required Imports
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { dataService } from "@/lib/apiService";

// Export page for viewer
export default function AddCourse() {
	// Functions to help maintain the form submit and set up
	const [courseName, setCourseName] = useState("");
	const [courseCode, setCourseCode] = useState("");
	const [description, setDescription] = useState("");
	const [durationInWeeks, setDurationInWeeks] = useState(1);
	const [isActive, setIsActive] = useState(false);

	// Create the router to return to the course managment page
	const router = useRouter();

	// Function to handle the submit action
	const handleSubmit = async (e: FormEvent) => {
		// Prevent the default action of the page reloading
		// This allows the filled in form elements to stay on screen
		// during a failed submit
		e.preventDefault();

		// Hold the string alert message
		let alertMessage: string = "";

		// Send an alert if a field is not filled, check through each field and generate message
		if (!courseName) {
			// Add message to alert
			alertMessage += "Course Name is required.\n";
		}

		if (!courseCode) {
			alertMessage += "Course Code is required.\n";
		}

		if (!description) {
			alertMessage += "Description is required.\n";
		}

		if (!durationInWeeks) {
			alertMessage += "Duration is required.\n";
		} else {
			// Test to see if it is not an int
			if (!Number.isInteger(durationInWeeks)) {
				alertMessage += "Duration must be an int.\n";
			} else {
				// If it is an int see if it is greater than 0
				if (durationInWeeks < 1) {
					// Return that is has to be greater than 0
					alertMessage += "Duration must be greater than 0.\n";
				}
			}
		}

		if (typeof isActive !== "boolean") {
			alertMessage += "Active must be true or false.\n";
		}

		// If the alertMessage is not empty throw the alert
		if (alertMessage != "") {
			alert(alertMessage);
		} else {
			// Do the other code by hooking to the db
			// and adding the course
			try {
				// Connect to the db
				const res = await dataService.post<Response>("/api/courses", {
					courseName,
					courseCode,
					description,
					durationInWeeks,
					isActive,
				});

				// const res = await fetch(
				// 	`${
				// 		process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
				// 	}/api/courses`,
				// 	{
				// 		method: "POST",
				// 		headers: {
				// 			"Content-type": "application/json",
				// 		},
				// 		body: JSON.stringify({
				// 			courseName,
				// 			courseCode,
				// 			description,
				// 			durationInWeeks,
				// 			isActive,
				// 		}),
				// 	}
				// );

				// If res is not ok
				if (!res.ok) {
					// Throw new error letting us know we were not able to create a course
					throw new Error("Failed to create new course.");
				}

				// Push back to the course managment page
				router.push("/dashboard/course-management");
			} catch (error) {
				// Log the error
				console.log(error);
			}
		}
	};

	// Function to return the form view
	return (
		<>
			<h2 className="mt-8 text-lg font-semibold text-center text-gray-700">
				Create New Course
			</h2>
			<div className="flex justify-center items-center">
				<form
					onSubmit={handleSubmit}
					className="flex flex-col gap-3 px-8 py-2 mt-9 w-3/5 justify-center"
				>
					<div className="border border-gray-700 px-8 py-2">
						<label className="block mb-2 text-sm font-medium text-gray-700">
							Course Name:
						</label>
						<input
							onChange={(e) => setCourseName(e.target.value)} // When this changes, set the value of the variable
							value={courseName} // This is equal to the state above
							className="border rounded px-3 py-2 w-full text-gray-700"
							type="text"
							placeholder="Enter Course Name"
						></input>
					</div>
					<div className="border border-gray-700 px-8 py-2">
						<label className="block mb-2 text-sm font-medium text-gray-700">
							Course Code:
						</label>
						<input
							onChange={(e) => setCourseCode(e.target.value)}
							value={courseCode}
							className="border rounded px-3 py-2 w-full text-gray-700"
							type="text"
							placeholder="Enter Course Code"
						></input>
					</div>
					<div className="border border-gray-700 px-8 py-2">
						<label className="block mb-2 text-sm font-medium text-gray-700">
							Description:
						</label>
						<textarea
							onChange={(e) => setDescription(e.target.value)}
							value={description}
							className="border rounded px-3 py-2 w-full text-gray-700"
							placeholder="Enter Course Description"
						></textarea>
					</div>
					<div className="border border-gray-700 px-8 py-2">
						<label className="block mb-2 text-sm font-medium text-gray-700">
							Course Duration:
						</label>
						<input
							onChange={(e) => {
								// If e.target.value is NaN then default the number to 1
								if (Number.isNaN(e.target.valueAsNumber)) {
									// Default it to one so the value does not cause an error
									setDurationInWeeks((e.target.valueAsNumber = 1));
								} else {
									setDurationInWeeks(e.target.valueAsNumber);
								}
							}}
							value={durationInWeeks}
							className="border rounded px-3 py-2 w-full text-gray-700"
							type="number"
							placeholder="Enter Course Duration In Weeks"
							min="1"
						></input>
					</div>
					<div className="border border-gray-700 px-8 py-2">
						<label className="block mb-2 text-sm font-medium text-gray-700">
							Currently Active:
						</label>
						<div className="flex justify-between">
							<input
								onChange={(e) => setIsActive(e.target.checked)}
								checked={isActive}
								className="w-5 h-5"
								type="checkbox"
								placeholder="Enter Student Contact Info"
							></input>
							<p className="text-m font-medium text-gray-700">
								{isActive ? "Active" : "Not Active"}
							</p>
						</div>
					</div>
					<div>
						<button
							className="bg-blue-300 shrink text-gray-700 py-3 px-6 w-fit border px-8 py-2 hover:bg-blue-400 hover:text-white"
							type="submit"
						>
							Add Course
						</button>
					</div>
					<div>
						<Link
							className="text-blue-400 hover:text-blue-200 py-5"
							href={"/dashboard/course-management"}
						>
							Go Back
						</Link>
					</div>
				</form>
			</div>
		</>
	);
}
