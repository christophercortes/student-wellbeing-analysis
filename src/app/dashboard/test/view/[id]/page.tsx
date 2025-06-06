// Fetch the image to display in the div
const obtainImage = async (id: string) => {
    try
    {
        // Attempt to fetch the data
        const response = await fetch(`${ process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000" }/api/images/obtain/${id}`, {
        cache: "no-store", // Don't save the cache into the browser
        });
        
        if (response.ok)
        {
            // Obtain the image from the json response
            const { image } = await response.json();
            // Return the div used in the page
            return (
                <div>
                    <img
                        src={`data:${image.contentType};base64,${Buffer.from(image.data).toString('base64')}`}
                        alt={image.name}
                        className="w-150"
                    />
                </div>
            );
        } else {
            return (<div className="text-center mt-8">
                    <h2>Image not found</h2>
                </div>
            );
        }
    } catch(error) {
        // Log the error
        console.log(error);
    }
}

// Component for viewing an image that was saved
export default async function DisplayImage({ params }: { params: Promise<{id: string}> })
{
    // Set the id
    const { id } = await params;

    // Call the function and return the result
    const imageDiv = obtainImage(id);

    // Return the page
    return (<>
        <div>
            <div>
                <h2>Image from the Database</h2>
            </div>
            { imageDiv }
        </div>
    </>);
}