import UploadForm from "@/components/dashboard/user-profile/UploadProfilePic";

export default async function UploadProfilePic ({ params, }: { params: Promise<{ id: string }>; })
{
    const { id } = await params;

    return(<>
        <h1 className="mt-8 text-lg font-semibold text-center text-gray-700">Upload Profile Picture</h1>
        <UploadForm id={id} />
    </>);
}