// Imports
import { getServerSession } from "next-auth/next"; // Obtain the session to use in the code
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Link from "next/link";

// Obtain the teacher
const GetTeacherData = async (id: string) => {
    try
    {
        // Attempt to fetch the data
        const response = await fetch(`${ process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000" }/api/teachers/${id}`, {
        cache: "no-store", // Don't save the cache into the browser
        });

        if (!response.ok)
        {
            console.log("Error obtaining Teacher Data");
            return (undefined);
        }

        const data = await response.json();
        return (data);
    } catch (error) {
        console.log(error);
        return (undefined);
    }
}

// Export the main function
export default async function UserProfile()
{
    // Obtain the data inside the session
    const Session = await getServerSession(authOptions);

    // Return the rendered page based on if session data is present
    if (!Session?.user)
    {
        // Tell the user to log in
        return(<>
            <div className="flex justify-center min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 py-6">
                <h2 className="text-gray-900">Please Log In.</h2>
            </div>
        </>);
    } else {
        // Obtain the teacher data from the id
        const userData = await GetTeacherData(Session.user.id);

        if (!userData)
        {
            return (<>
                <div className="flex justify-center min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 py-6">
                    <h2 className="text-gray-900">User Data could not be located.</h2>
                </div>
            </>);
        }

        // Check to see if an image is there, if not get the different div
        let imageContent;

        if (!userData.profilePicture) 
        {
            imageContent = (
                <div>
                    <p className="text-gray-900 text-center p-3 text-sm">Currently No Profile Picture...</p>
                    <Link 
                        href={`/dashboard/user-profile/upload-profile-pic/${userData._id}`}
                    ><p className="text-center text-blue-400 hover:text-blue-200">Click Here to Upload a Picture!</p></Link>
                </div>
            );
        } else {
            imageContent = (
            <div className="mx-auto">
                <img src={userData.profilePicture} />
            </div>
        );
        }

        return (<>
            <h1 className="text-gray-900 text-center text-lg font-bold mt-5">User Profile Information</h1>
            <div className="flex flex-col justify-start min-h-screen px-4 sm:px-6 lg:px-8 py-6">
                <div className="flex flex-col w-full max-w-7xl mx-auto space-y-6 bg-white rounded-lg shadow border border-gray-200 p-4 overflow-auto m-3">
                    <h2 className="text-gray-900 text-center bg-gray-200 p-3">Full Name:</h2>
                    <p className="text-gray-900 text-center p-3">{userData.fullName}</p>
                </div>
                <div className="flex flex-col w-full max-w-7xl mx-auto space-y-6 bg-white rounded-lg shadow border border-gray-200 p-4 overflow-auto m-3">
                    <h2 className="text-gray-900 text-center bg-gray-200 p-3">Email:</h2>
                    <p className="text-gray-900 text-center p-3">{userData.email}</p>
                </div>
                <div className="flex flex-col w-full max-w-7xl mx-auto space-y-6 bg-white rounded-lg shadow border border-gray-200 p-4 overflow-auto m-3">
                    <h2 className="text-gray-900 text-center bg-gray-200 p-3">Phone Number:</h2>
                    <p className="text-gray-900 text-center p-3">{userData.phoneNumber}</p>
                </div>
                <div className="flex flex-col w-full max-w-7xl mx-auto space-y-6 bg-white rounded-lg shadow border border-gray-200 p-4 overflow-auto m-3">
                    <h2 className="text-gray-900 text-center bg-gray-200 p-3">Address:</h2>
                    <p className="text-gray-900 text-center p-3">{userData.address}</p>
                </div>
                <div className="flex flex-col w-full max-w-7xl mx-auto space-y-6 bg-white rounded-lg shadow border border-gray-200 p-4 overflow-auto m-3">
                    <h2 className="text-gray-900 text-center bg-gray-200 p-3">Profile Picture:</h2>
                    {imageContent}
                </div>
            </div>
        </>);
    }
}