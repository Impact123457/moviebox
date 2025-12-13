'use server'

import { auth } from "@/auth"
import { parseServerActionResponse } from "./utils";
import { writeClient } from "@/sanity/lib/write-client";

export const UpdateProfile= async (state: any, form: FormData, _id: string) =>{
    const session = await auth();

    if(!session) return parseServerActionResponse({
        error: 'Not singed in',
        status: 'Error',

    });
    const name = form.get("name") as string;
    const bio = form.get("bio") as string;
    let file = form.get("file") as File | null;

    if(file && file.size <= 0){
        file = null;
    }
    try{
        let result;
        if(file){
            const buffer = Buffer.from(await file.arrayBuffer());

            const uploadedAsset = await writeClient.assets.upload('image', buffer, {
                filename: file.name,
            });

                result = await writeClient.patch(_id).set({
                name,
                bio,
                image: {
                    _type: 'image',
                    asset: {
                        _type: 'reference',
                        _ref: uploadedAsset._id,
                    },
                },
            }).commit();
        }
        else{
            result = await writeClient.patch(_id).set({
            name,
            bio,
            }).commit();
        } 
        return parseServerActionResponse({
            ...result,
            error: '',
            status: 'SUCCESS'
        })
    }
    catch(error){
        console.log(error);

        return parseServerActionResponse({
            error: JSON.stringify(error),
            status: 'ERROR'
        });
    }
}