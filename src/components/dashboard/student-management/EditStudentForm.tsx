// Export the form for the page
export default function EditStudentForm()
{
    // Return the form
    return (<>
        <h2 className="mt-8 text-lg font-semibold text-center text-gray-700">Update Student</h2>
        <div className="flex justify-center items-center">
            <form className="flex flex-col gap-3 px-8 py-2 mt-9 w-3/5 justify-center">
                <div className="border px-8 py-2">
                    <label 
                        className="block mb-2 text-sm font-medium text-gray-700"
                    >Full Name:</label>
                    <input
                        className="border rounded px-3 py-2 w-full text-gray-700" 
                        type="text" 
                        placeholder="Enter Student Full Name"
                    ></input>
                </div>
                <div className="border px-8 py-2">
                    <label 
                        className="block mb-2 text-sm font-medium text-gray-700"
                    >Date of Birth:</label>
                    <input
                        className="border rounded px-3 py-2 w-full text-gray-700" 
                        type="date"
                    ></input>
                </div>
                <div className="border px-8 py-2">
                    <label 
                        className="block mb-2 text-sm font-medium text-gray-700"
                    >Course Name:</label>
                    <input  
                        className="border rounded px-3 py-2 w-full text-gray-700" 
                        type="text" 
                        placeholder="Enter Course"
                    ></input>
                </div>
                <div className="border px-8 py-2">
                    <label 
                        className="block mb-2 text-sm font-medium text-gray-700"
                    >Teacher Name:</label>
                    <input  
                        className="border rounded px-3 py-2 w-full text-gray-700" 
                        type="text" 
                        placeholder="Enter Teacher"
                    ></input>
                </div>
                <div className="border px-8 py-2">
                    <label 
                        className="block mb-2 text-sm font-medium text-gray-700"
                    >Contact Info:</label>
                    <input  
                        className="border rounded px-3 py-2 w-full text-gray-700" 
                        type="text" 
                        placeholder="Enter Student Contact Info"
                    ></input>
                </div>
                <div className="border px-8 py-2">
                    <label 
                        className="block mb-2 text-sm font-medium text-gray-700"
                    >Parent Name:</label>
                    <input  
                        className="border rounded px-3 py-2 w-full text-gray-700" 
                        type="text" 
                        placeholder="Enter Student Parent Name"
                    ></input>
                </div>
                <div className="border px-8 py-2">
                    <label 
                        className="block mb-2 text-sm font-medium text-gray-700"
                    >Parent Email:</label>
                    <input
                        className="border rounded px-3 py-2 w-full text-gray-700" 
                        type="email" 
                        placeholder="Enter Parent Email"
                    ></input>
                </div>
                <div>
                    <button className="bg-blue-300 shrink text-gray-700 py-3 px-6 w-fit border px-8 py-2" type="submit">Update Student</button>
                </div>
            </form>
        </div>
    </>);
}