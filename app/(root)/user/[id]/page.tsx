import { USER_BY_ID_QUERY } from "@/sanity/lib/queries";
import { auth } from "@/auth";
import { client } from "@/sanity/lib/client";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default async function Profile({ params }: { params: { id: string } }){
    const id = (await params).id;
    const session = await auth();
    
    const user = await client.fetch(USER_BY_ID_QUERY, { id });
    if (!session) redirect("/");

    return(
        <>
        {user ? (
            <div className="md:w-[900px] w-[400px] my-5 mx-auto h-[530px] shadow-lg">
                <div>
                    <h1 className="m-5 font-bold text-2xl">{user.username}</h1> 
                    <div className="flex p-2">
                        <Image src={user.image || "/defaultPFP.jpg"} alt="pfp" width={100} height={100} className="w-[100px] h-[100px] rounded-full m-3 border-2 border-black object-cover" />
                        <div>
                            <p className="p-5 mt-3 md:w-[400px]">{user.bio}</p>
                            {session?.user.provider == "credentials" ? 
                            <Link href={`./editProfile/${user?._id}`} className="rounded bg-black text-white p-2 m-5">
                                Edit profile
                            </Link>
                            : "If you are logged in with GitHub you cannot edit your profile!!"}
                        </div>
                    </div>       
                </div>
            <div className="mt-5 items-center justify-center border font-bold border-black p-3 flex gap-5 bg-black text-white uppercase">
                <Link href="/liked">Favourites</Link>
                <Link href="/watched">Diary</Link>
                <Link href="/watchlist">Next watch</Link>
            </div>    
            </div>
        ):(
            <div className="md:w-[900px] h-[550px] mx-auto flex items-center justify-center"><p className="text-center p-5">No user found</p></div>
        )}
        </>
    );
}