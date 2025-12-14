'use server'

import { auth } from "@/auth"
import { parseServerActionResponse } from "./utils";
import { writeClient } from "@/sanity/lib/write-client";
import { 
    LIKE_BY_USER_ID_QUERY, LIKE_BY_MOVIE_USER_ID_QUERY, WATCHED_BY_MOVIE_USER_ID_QUERY, WATCHED_BY_USER_ID_QUERY  
} from "@/sanity/lib/queries";

//za update profile:
export const UpdateProfile= async (state: any, form: FormData, _id: string) =>{
    const session = await auth();

    if(!session) return parseServerActionResponse({
        error: 'Not singed in',
        status: 'Error',

    });
    const username = form.get("username") as string;
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
                username,
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
            username,
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


//like button:
export const LikeMovie = async (_id: string) =>{
    const session = await auth();

    if(!session) return parseServerActionResponse({
        error: 'Not singed in',
        status: 'Error',

    });
    const userId = session?.user.id;
    const liked = await writeClient.fetch(LIKE_BY_MOVIE_USER_ID_QUERY, {
        id: _id,
        userId,
    });
    let result;
    if(liked){
        try{
            const result = await writeClient
            .patch(liked._id)
            .unset([`movies[_ref=="${_id}"]`])
            .commit()
        return parseServerActionResponse({
            ...result,
            error: '',
            status: 'SUCCESSdislike'
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
    else{
        const like = await writeClient.fetch(LIKE_BY_USER_ID_QUERY, {userId})
        try{
        if (like) {
            result = await writeClient
            .patch(like._id)
            .append('movies', [
            {
                _key: _id,
                _type: 'reference',
                _ref: _id,
            },
            ])
            .commit()
        }
        else{
            result = await writeClient.create({
                _type: "liked",
                user: {
                    _type: 'reference',
                    _ref: userId,
                },
                movies: [
                    {
                        _type: 'reference',
                        _ref: _id,
                        _key: _id,
                    }
                ]
            })
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
}

//za watched
export const WatchedMovies = async (_id: string) =>{
    const session = await auth();

    if(!session) return parseServerActionResponse({
        error: 'Not singed in',
        status: 'Error',

    });
    const userId = session?.user.id;
    const watched = await writeClient.fetch(WATCHED_BY_MOVIE_USER_ID_QUERY, {
        id: _id,
        userId,
    });
    let result;
    if(watched){
        try{
            const result = await writeClient
            .patch(watched._id)
            .unset([`movies[_ref=="${_id}"]`])
            .commit()
        return parseServerActionResponse({
            ...result,
            error: '',
            status: 'SUCCESSdislike'
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
    else{
        const watched = await writeClient.fetch(WATCHED_BY_USER_ID_QUERY, {userId})
        try{
        if (watched) {
            result = await writeClient
            .patch(watched._id)
            .append('movies', [
            {
                _key: _id,
                _type: 'reference',
                _ref: _id,
            },
            ])
            .commit()
        }
        else{
            result = await writeClient.create({
                _type: "watched",
                user: {
                    _type: 'reference',
                    _ref: userId,
                },
                movies: [
                    {
                        _type: 'reference',
                        _ref: _id,
                        _key: _id,
                    }
                ]
            })
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
}