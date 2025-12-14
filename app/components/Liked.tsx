"use client"

import { useActionState, useState } from "react";
import { Heart } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import z from "zod";
import { LikeMovie } from "@/lib/actions";
const Liked = ({id, likeId}: {id: string, likeId: string | null}) => {

    const [errors, setErrors] = useState<Record<string, string>>({});
    const router = useRouter();

    const handleFormSubmit2 = async () => {
            try{
                //console.log("\n \n \n \n \n",name, email, file, "\n \n \n \n \n");
                const result = await LikeMovie(id);
                
                if(result.status == 'SUCCESS'){
                    toast.success("Liked movie")
                }
                else if(result.status == 'SUCCESSdislike'){
                    toast.success("Disliked movie")
                }
                router.push("");
            }
            catch (error){
                if(error instanceof z.ZodError){
                    const fieldErrors = error.flatten().fieldErrors;
                    
                    setErrors(fieldErrors as unknown as Record<string, string>);
                    
                    //console.log("\n \n \n \n \n",title , "\n \n \n \n \n");

                    toast.error("Failed to like a movie");
    
                    return {error: 'liking failed', status:'ERROR'};
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