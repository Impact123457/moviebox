import Image from "next/image";
import Link from "next/link";
import { auth } from "@/auth";

export default async function edit(){
    const session = await auth();//a je user prijavlen
    const user = session?.user;
    
    return(
        <section className="p-5 my-5 shadow-lg max-w-[700px] mx-auto h-[500px]">
            <div>
                <div className="signForms">
                        <h2 className="text-2xl text-black font-semibold text-center m-5">Edit your profile</h2>
                        <form action={""} className="space-y-3">
                            <input type="text" name="username" placeholder="username..." className="input" />
                            <input type="file" name="image" accept="image/*" className="input" />
                            <textarea className="input" placeholder="bio..." />
                        </form>
                        <button type="submit" className="border w-full cursor-pointer p-2 rounded bg-black text-white my-2">
                            Save
                        </button>
                        <Link href={`/user/${session?.user?.id}`} className="block w-full border text-center cursor-pointer p-2 rounded">
                            Back
                        </Link>
                </div>
            </div>
        </section>
    )
}
