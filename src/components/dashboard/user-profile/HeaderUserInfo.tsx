import { getServerSession } from "next-auth/next"; // Obtain the session to use in the code
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function HeaderUserName() 
{
    const Session = await getServerSession(authOptions);
    const username = Session?.user.name;

    return (username);
}

export async function HeaderImage() 
{
    const Session = await getServerSession(authOptions);
    const pic = Session?.user.image;

    return (pic);
} 