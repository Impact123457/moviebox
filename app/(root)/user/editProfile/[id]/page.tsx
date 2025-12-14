import { auth } from "@/auth";
import Link from "next/link";
import { writeClient } from "@/sanity/lib/write-client";
import { USER_BY_ID_QUERY } from "@/sanity/lib/queries";
import { User } from "@/sanity/types";
import Update from "@/app/components/Update";
import { redirect } from "next/navigation";

export type UserType = Omit<User, "name" | "surname" | "username" | "bio" | "email" | "image" | "imageUrl"> & {
    name?: string | undefined;
    surname?: string | undefined;
    username?: string | undefined;
    bio?: string | undefined;
    email?: string | undefined;
    image?: string | undefined;
    imageUrl?: string | undefined;
}
export default async function edit({ params }: { params: { id: string } }){
  const session = await auth();
  const { id } = await params;
  const user = await writeClient.fetch(USER_BY_ID_QUERY, {id});
  if(session?.user.provider != "credentials") redirect("/");
  
  return (
    <section className="p-5 my-5 shadow-lg w-[600px] mx-auto h-[500px]">
      <Update user={user} />
        <Link href={`/user/${session?.user?.id}`} className="block w-full border bg-black  text-white text-center cursor-pointer p-2 rounded">
            Back
        </Link>
    </section>
  )
}
