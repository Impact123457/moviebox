"use client"
import { DeleteComment } from "@/lib/actions";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";



export default function DeleteCommentButton({_id, userId}:{_id: string, userId: string}){
    async function handleDelete(){
        try{
            const result = DeleteComment(_id, userId);
            toast.success("Your comment was deleted succesfully")
        }
        catch(error){
            toast.error("Your was not deleted")
        }
    }

    return(
        <>
            <button onClick={() => handleDelete()}>
                <Trash2 className="text-red-600" />
            </button>
        </>
    );
}