"use client";

import { useActionState, useState } from "react";
import { Eye } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { WatchedMovies } from "@/lib/actions";
import z from "zod";

const Watched = ({id, watchedId}: {id: string, watchedId: string | null}) => {
    const [errors, setErrors] = useState<Record<string, string>>({});//shranjuje napake
    const router = useRouter();//navigacija

    const handleFormSubmit2 = async () => {
            try{
                const result = await WatchedMovies(id);//doda al odstrani like
                if(result.status == 'SUCCESS'){
                    toast.success("Moie added to diary.")
                }
                else if(result.status == 'SUCCESSdislike'){
                    toast.success("Movie removed from diary.")
                }
                router.push("");
            }
            catch (error){
                if(error instanceof z.ZodError){//če preverjanje podatkov na strežniku ne uspe

                    const fieldErrors = error.flatten().fieldErrors;
                    setErrors(fieldErrors as unknown as Record<string, string>);
                    toast.error("Failed to add movie to diary.");
    
                    return {error: 'Adding to diary failed.', status:'ERROR'};
                }
                toast.error("Unexpected error");
                return {error: 'unexpected error', status: 'ERROR'};
            } 
        };

    const [state2, formAction, isPending] = useActionState(handleFormSubmit2,
        {
        error : '',
        status: 'INITIAL',
        }
    );
    return(
        <form action={formAction}>
            <button className="cursor-pointer mx-3">
                {watchedId 
                ? <Eye className="w-10 h-10 text-red-500"/>
                : <Eye className="w-10 h-10 text-black"/>}
            </button>
        </form>
    )
}
export default Watched; 

//<Image src="/didntView.png" alt="didntView" width={30} height={30}></Image>