"use client";

import Link from "next/link";
import { useState, useActionState } from "react";

const Update = ({ user }: { user?: any }) => {
    const handleFormSubmit = () =>{};
    const [error, setErrors] = useState<Record<string,string>>({});
    const [state, formAction, save] = useActionState(handleFormSubmit, 
    {
        error: '', 
        status: 'INITIAL',
    });
    
    return(
    <div className="signForms">
        <h2 className="text-2xl text-black font-semibold text-center m-5">Edit your profile</h2>
            <form action={""} className="space-y-3">
                <label htmlFor="username">Username:</label>
                    <input id="username" type="text" name="username" placeholder={user?.name || "Enter your username"} className="input" />
                {error.username && <p className="">{error.username}</p>}
                <label htmlFor="image">Image:</label>
                    <input id="image" type="file" name="image" accept="image/*" className="input" />
                {error.image && <p className="">{error.image}</p>}
                <label htmlFor="bio">Bio:</label>
                    <textarea id="bio" className="input" name="bio" placeholder="Enter your bio" />
                {error.bio && <p className="">{error.bio}</p>}
                <button type="submit" disabled={save} className="border w-full cursor-pointer p-2 rounded bg-black text-white my-2">
                    {save ? 'Saving...' : 'Save changes'}    
                </button>    
            </form>
    </div>
    )
}
export default Update;