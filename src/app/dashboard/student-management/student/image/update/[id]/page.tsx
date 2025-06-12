// Imports
import EditStudentImageForm from "@/components/dashboard/student-management/EditStudentImage"

// Get the file by it's id
const getImageById = async (id: string) => {
    try
    {
        // Connect to the db
        const response = await fetch(`${ process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000" }/api/images/obtain/${id}`, {
            cache: "no-store", // Don't save the cache into the browser
        });

        if (!response.ok) 
        {
            // Throw Error if image can't be obtained
            throw new Error("Failed to fetch Image");
        }

        // Return the data
        return response.json();
    } catch (error) {
        // Log the error
        console.log(error);
    }
}

// Function to display to the viewer
export default async function EditStudentImage({ params, }: { params: Promise<{ id: string }>; })
{
    // Obtain the id from the params
    const { id } = await params;

    // Get the data
    const { image } = await getImageById(id);

    // Split up the data
    const{ name, data, contentType } = image;

    // Return the page
    return (<EditStudentImageForm
        id={ id }
        name={ name }
        data= { data }
        contentType={ contentType }
    />);
}