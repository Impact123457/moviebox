import { MOVIE_BY_ID_QUERY, USER_BY_ID_QUERY } from "@/sanity/lib/queries";
import { auth } from "@/auth";
import { client } from "@/sanity/lib/client";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const Profile = async ({ params }: { params: { id: string } }) => {
    const id = (await params).id;
    const session = await auth();

    const user = await client.fetch(USER_BY_ID_QUERY, { id });
    const movie = await client.fetch(MOVIE_BY_ID_QUERY, { id });
    if (!user) return notFound();
    //

    return(
        <>
        <div className="max-w-[900px] mx-auto min-h-[550px] shadow-lg">
            <div className="bg-amber-500 p-2">
                <Image src={user.image} alt="pfp" width={100} height={150} className="m-3 border-2 border-black" />
                <p>{user.username}</p>   
                <p>{user.bio}</p>
            </div>

            <div className="items-center justify-center border border-black p-3 flex gap-5 uppercase">
                <Link href="/liked">Favourites</Link>
                <Link href="/watched">Films</Link>
                <Link href="/watchlist">Next watch</Link>
                <Link href="/playlist">Play lists</Link>
            </div>
            
            <Link href="/edit">
                Edit profile
            </Link>
        </div>
        </>
    );
}
export default Profile;