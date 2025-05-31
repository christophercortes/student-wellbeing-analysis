// Export page for viewer
export default async function Page()
{
    // Return the page
    return (<>
        <h2 className="mt-8 text-lg font-semibold text-center text-gray-700">Create New Student</h2>
        <div className="flex justify-center items-center">
            <form className="flex flex-col gap-3 px-8 py-2 mt-9 w-3/5 justify-center">
                <div className="border px-8 py-2">
                    <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="fullName">Full Name:</label>
                    <input className="border rounded px-3 py-2 w-full text-gray-700" type="text" id="fullName" name="fullName" placeholder="Enter Student Full Name"></input>
                </div>
                <div className="border px-8 py-2">
                    <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="dateOfBirth">Date of Birth:</label>
                    <input className="border rounded px-3 py-2 w-full text-gray-700" type="date" id="dateOfBirth" name="dateOfBirth"></input>
                </div>
                <div className="border px-8 py-2">
                    <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="courseName">Course Name:</label>
                    <input className="border rounded px-3 py-2 w-full text-gray-700" type="text" id="courseName" name="courseName" placeholder="Enter Course"></input>
                </div>
                <div className="border px-8 py-2">
                    <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="teacherName">Teacher Name:</label>
                    <input className="border rounded px-3 py-2 w-full text-gray-700" type="text" id="teacherName" name="teacherName" placeholder="Enter Teacher"></input>
                </div>
                <div className="border px-8 py-2">
                    <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="contactInfo">Contact Info:</label>
                    <input className="border rounded px-3 py-2 w-full text-gray-700" type="text" id="contactInfo" name="contactInfo" placeholder="Enter Student Contact Info"></input>
                </div>
                <div className="border px-8 py-2">
                    <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="parentName">Parent Name:</label>
                    <input className="border rounded px-3 py-2 w-full text-gray-700" type="text" id="parentName" name="parentName" placeholder="Enter Student Parent Name"></input>
                </div>
                <div className="border px-8 py-2">
                    <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="parentEmail">Parent Email:</label>
                    <input className="border rounded px-3 py-2 w-full text-gray-700" type="email" id="parentEmail" name="parentEmail" placeholder="Enter Parent Email"></input>
                </div>
                <div>
                    <button className="bg-blue-300 shrink text-gray-700 py-3 px-6 w-fit border px-8 py-2" type="submit">Add Student</button>
                </div>
            </form>
        </div>
    </>);
}