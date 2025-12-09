import Image from "next/image";
import Link from "next/link";
import { auth } from "@/auth";

export default async function edit(){
    const session = await auth();//a je user prijavlen
    const user = session?.user;
    return(
        <section className="p-5 my-5 shadow-lg w-[900px] mx-auto min-h-[500px]">
            <div>
                <h2 className="text-black font-bold text-[20px]">already seen but why not again</h2>
                <hr className="border border-black mb-1 shadow-lg" />  
            </div>
        </section>
    )
}
