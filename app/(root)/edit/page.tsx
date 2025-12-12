import { auth } from "@/auth";
import Update from "@/app/components/Update";
import Link from "next/link";
const edit = async () =>{
const session = await auth();
  return (
    <section className="p-5 my-5 shadow-lg w-[600px] mx-auto h-[500px]">
        <Update user={session?.user} />
        <Link href={`/user/${session?.user?.id}`} className="block w-full border text-center cursor-pointer p-2 rounded">
            Back
        </Link>
    </section>
  )
}
export default edit;