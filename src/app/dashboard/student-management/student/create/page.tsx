// Export page for viewer
export default async function Page()
{
    // Return the page
    return (<>
        <h2 className="mt-8 text-lg font-semibold text-center">Create New Student</h2>
        <form className="flex flex-col gap-3">
            <div>
                <label htmlFor="fullName">Full Name:</label>
                <input type="text" id="fullName" name="fullName" placeholder="Enter Student Full Name"></input>
            </div>
            <div>
                <label htmlFor="dateOfBirth">Date of Birth:</label>
                <input type="date" id="dateOfBirth" name="dateOfBirth"></input>
            </div>
            <div>
                <label htmlFor="courseName">Course Name:</label>
                <input type="text" id="courseName" name="courseName" placeholder="Enter Course"></input>
            </div>
            <div>
                <label htmlFor="teacherName">Teacher Name:</label>
                <input type="text" id="teacherName" name="teacherName" placeholder="Enter Teacher"></input>
            </div>
            <div>
                <label htmlFor="contactInfo">Contact Info:</label>
                <input type="text" id="contactInfo" name="contactInfo" placeholder="Enter Student Contact Info"></input>
            </div>
            <div>
                <label htmlFor="parentName">Parent Name:</label>
                <input type="text" id="parentName" name="parentName" placeholder="Enter Student Parent Name"></input>
            </div>
            <div>
                <label htmlFor="parentEmail">Parent Email:</label>
                <input type="email" id="parentEmail" name="parentEmail" placeholder="Enter Parent Email"></input>
            </div>
            <div>
                <input type="submit" value="Submit"></input>
            </div>
        </form>
    </>);
}