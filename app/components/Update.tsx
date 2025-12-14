'use client'

import { useState, useActionState } from 'react';
import { profileSchema } from "@/lib/validation";
import { z } from 'zod';
import { redirect, useRouter } from "next/navigation";
import { UserType } from '../(root)/user/editProfile/[id]/page';
import { UpdateProfile } from "@/lib/actions";
import { toast } from "sonner";

export default function Update({user}: {user: UserType}){

    const [errors, setErrors] = useState<Record<string, string>>({});

    const [username, setUsername] = useState(user.username|| "");
    const [bio, setBio] = useState(user.bio || "");
    const [file, setFile] = useState(user.image);

    function handleFile(file: File) {
        const url = URL.createObjectURL(file); // takoj dobiš preview
    setFile(url);
  }
    const router = useRouter();
    const handleFormSubmit = async (prevState: any, formData: FormData) => {
            try{
                let formValues;
                if(file == user.image){
                    formValues = {
                    username: formData.get("username") as string,
                    bio: formData.get("bio") as string,
                    }
                }
                else{
                    formValues = {
                    username: formData.get("username") as string,
                    bio: formData.get("bio") as string,
                    file: formData.get("file") as File
                    }
                }
            await profileSchema.parseAsync(formValues);
            const result = await UpdateProfile(prevState, formData, user._id);  
                if(result.status == 'SUCCESS'){
                    toast.success("Your profile was updated succesfully!")
                }
                router.push(`/user/${user?._id}`);
            }
            catch (error){
                if(error instanceof z.ZodError){
                    const fieldErrors = error.flatten().fieldErrors;
                    
                    setErrors(fieldErrors as unknown as Record<string, string>);

                    console.log("\n \n \n \n \n",error , "\n \n \n \n \n");

                    toast.error("Please check your inputs and try again");
                    return {...prevState, error: 'Updating failed', status:'ERROR'};
                }
                toast.error("Unexpected error");
                return {...prevState, error: 'unexpected error', status: 'ERROR'};
            } 
        };

    const [state, formAction, isPending] = useActionState(handleFormSubmit,
        {
        error : '',
        status: 'INITIAL',
        }
    );

  return (
    <section>
        <div className="signForms">
            <h2 className="text-2xl text-black font-semibold text-center m-5">Edit profile</h2>
            <form action={formAction} className="space-y-3">
                    <label htmlFor="username">Username</label>
                    <input 
                        id='username' 
                        name='username' className='input' 
                        placeholder='username' value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    {errors.title && <p className='comment-form-error'>{errors.title}</p>}

                    <label htmlFor="bio" className='comment-form-label'>bio</label>
                    <textarea 
                        id='bio'
                        name='bio'
                        className='input'
                        placeholder='bio'
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                    />
                    {errors.title && <p className='comment-form-error'>{errors.title}</p>}
                    <label htmlFor="file" className='comment-form-label'>image</label>
                    <div className='relative'>
                        <div className="w-[100px] h-[100px] rounded-full" style={{backgroundImage: `url('${file}')`, backgroundSize: 'cover', backgroundPosition: 'center'}}></div>
                        <input 
                            type='file'
                            id='file'
                            accept=".png,.jpg,.jpeg"
                            name='file'
                            className='w-[100px] h-[100px] items-center px-3 py-2 text-sm border-3 absolute inset-0 text-transparent border-textprimary hover:bg-black/50 rounded-full'
                            placeholder='file'
                            onChange={(e) => {
                            const f = e.target.files?.[0];
                            if (f) handleFile(f);
                            }}
                        />
                    {errors.title && <p className='comment-form-error'>{errors.title}</p>}
                    </div>
                <button type='submit' className="logButton bg-white text-black border-black" disabled={isPending}>
                    {isPending ? 'Submitting...' : 'Update profile'}
                </button>
            </form>
        </div>
    </section>
  )
}