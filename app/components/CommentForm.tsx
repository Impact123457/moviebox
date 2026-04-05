"use client"
import { Input } from "./ui/input";
import { useState, useActionState } from "react";
import { Send } from "lucide-react";
import { FormSchema } from "@/lib/validation";
import { z } from "zod";
import { toast } from "sonner" 
import { useRouter } from "next/navigation";
import { createComment } from "@/lib/actions";
import MDeditor from "@uiw/react-md-editor";


// Za ustvarjanje novega komentarja
export default function CommentForm({_id, onAddComment}:{_id: string, onAddComment: () => void}){

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [description, setDescription] = useState("I like the movie");
    const router = useRouter();
    const handleFormSubmit = async (prevState: any, formData: FormData) => {
        try{
            const FormValues = {
                title: formData.get("title") as string,
                description,
                movieId: formData.get("movieId") as string,
            }

            // Validacija z Zod shemo
            await FormSchema.parseAsync(FormValues);
            const Result = await createComment(prevState, formData, description);
            
            // Če je komentar uspešno ustvarjen, prikaže obvestilo
            if(Result.status == "SUCCESS"){
                toast.success("Your comment was created succesfully")
                onAddComment()
            }
        }
        catch (error){
            // Obdelava validacijskih napak
            if(error instanceof z.ZodError){
                const fieldErrors = error.flatten().fieldErrors;

                setErrors(fieldErrors as unknown as Record<string, string>);
                toast.error("Please check your inputs and try again");

                return {
                    ...prevState, error: "validation failed", status:"ERROR"
                };
            }

            toast.error("Unexpected error");
            return {
                ...prevState, error: "unexpected error", status: "ERROR"
            };
        } 
    };

    const [state, formAction, isPending] = useActionState(handleFormSubmit,
        {
            error : "",
            status: "INITIAL",
        }
    );

  return (
    <form action={formAction} className="p-5 my-4 rounded-2xl min-w-[500px]">
        <div className="comment-form-part">
            <label 
                htmlFor="title" 
                className="comment-form-label">
                Title
            </label>
            <Input 
                id="title"
                name="title"
                className="Comment-form-input"
                placeholder="Comment title"
            />
            {errors.title && <p className="comment-form-error">{errors.title}</p>}
        </div>
        <input type="hidden" name="movieId" value={_id} />
        <div className="comment-form-part">
            <label
                htmlFor="description" 
                className="comment-form-label">
                Description
            </label>
            
            <MDeditor 
                value={description}
                onChange={(value) => setDescription(value as string)}
                className="comment-form-mdeditor"
                preview="edit"
                id="description"
                height={300}
                style={{
                    borderRadius:20,
                    overflow:"hidden",
                    backgroundColor: "#ffffff",
                    color: "black" 
                }}
                textareaProps={{
                    placeholder: "add the description of your comment",
                    required: true,
                }}
                previewOptions={{
                    disallowedElements: ["style"],
                }}
            />

            {errors.description && <p className="comment-form-error">{errors.description}</p>}
        </div>
        <button name="subm" type="submit" className="cursor-pointer flex bg-primary text-white rounded-2xl px-3 py-2" disabled={isPending}>
            {isPending ? "Submitting..." : "Post comment"} <Send className="size-6 ml-2 mt-1" />
        </button>
    </form>
  )
}
