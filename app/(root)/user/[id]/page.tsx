import { USER_BY_ID_QUERY } from "@/sanity/lib/queries";
import { auth } from "@/auth";
import { client } from "@/sanity/lib/client";
import { notFound } from "next/navigation";

const Profile = async ({ params }: { params: { id: string } }) => {
    const id = (await params).id;
    const session = await auth();

    const user = await client.fetch(USER_BY_ID_QUERY, { id });
   
    if (!user) return notFound();

    return(
        <div>
            wassap
        </div>
    );
}
export default Profile;