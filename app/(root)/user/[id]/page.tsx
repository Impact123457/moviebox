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
    if (!user) return notFound();
    return(
        <>
            <div className="max-w-[900px] my-5 mx-auto h-[530px] shadow-lg">
                <div>
                    <h1 className="m-5 font-bold text-2xl">{user.username}</h1> 
                    <div className="flex p-2">
                        <Image src={user.image || "/defaultPFP.jpg"} alt="pfp" width={100} height={100} className="rounded-full m-3 border-2 border-black object-cover" />
                        <div>
                            <p className="p-5 mt-3 w-[400px]">{user.bio}</p>
                            <Link href="/edit" className="rounded bg-black text-white p-2 m-5">
                            Edit profile
                            </Link>
                        </div>
                    </div>
                         
                </div>
                <div className="mt-5 items-center justify-center border font-bold border-black p-3 flex gap-5 bg-black text-white uppercase">
                    <Link href="/liked">Favourites</Link>
                    <Link href="/watched">Diary</Link>
                    <Link href="/watchlist">Next watch</Link>
                </div>
                
            </div>
        </>
    );
}
export default Profile;