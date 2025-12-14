"use client" // da lahk uporablam npr. useState, useAction, StateuseRouter

import { useActionState, useState } from "react";
//useState = za shranjevanje napak
//useActionState = za upravljanje z async actions npr. server actions
import { Heart } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import z from "zod";
import { LikeMovie } from "@/lib/actions";

const Liked = ({id, likeId}: {id: string, likeId: string | null}) => {
    const [errors, setErrors] = useState<Record<string, string>>({});//shranjuje napake
    const router = useRouter();//navigacija

    const handleFormSubmit2 = async () => {
            try{
                const result = await LikeMovie(id);//doda al odstrani like
                if(result.status == 'SUCCESS'){
                    toast.success("Liked movie.")
                }
                else if(result.status == 'SUCCESSdislike'){
                    toast.success("Disliked movie.")
                }
                router.push("");
            }
            catch (error){
                if(error instanceof z.ZodError){//če preverjanje podatkov na strežniku ne uspe

                    const fieldErrors = error.flatten().fieldErrors;
                    setErrors(fieldErrors as unknown as Record<string, string>);
                    toast.error("Failed to like a movie");
    
                    return {error: 'Liking failed.', status:'ERROR'};
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
                {likeId ? <Heart className="w-10 h-10 text-red-500"/>
                : <Heart className="w-10 h-10 text-black"/>}
            </button>
        </form>
    )
}
export default Liked;