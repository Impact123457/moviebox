import { auth } from "@/auth";
import Link from "next/link";
import { writeClient } from "@/sanity/lib/write-client";
import { USER_BY_ID_QUERY } from "@/sanity/lib/queries";
import { Update } from "next/dist/build/swc/types";

export default async function edit({ params }: { params: { id: string } }){
  const session = await auth();
  const { id } = await params;
   const user = await writeClient.fetch(USER_BY_ID_QUERY, {id});
  return (
    <section className="p-5 my-5 shadow-lg w-[600px] mx-auto h-[500px]">
      
        <Link href={`/user/${session?.user?.id}`} className="block w-full border text-center cursor-pointer p-2 rounded">
            Back
        </Link>
    </section>
  )
}
//<Update user={session?.user} />