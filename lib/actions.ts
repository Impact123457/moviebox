'use server' //deluje na server strani

import  slugify  from "slugify";
import { auth } from "@/auth"
import { parseServerActionResponse } from "./utils";
import { writeClient } from "@/sanity/lib/write-client";
import { 
    LIKE_BY_USER_ID_QUERY, LIKE_BY_MOVIE_USER_ID_QUERY, 
    WATCHED_BY_MOVIE_USER_ID_QUERY, WATCHED_BY_USER_ID_QUERY,
    WATCHLIST_BY_MOVIE_USER_ID_QUERY, WATCHLIST_BY_USER_ID_QUERY,
} from "@/sanity/lib/queries";
import { movie } from "@/sanity/schemaTypes/movie";

//create coment
export const createComment = async (state: any, form: FormData, description: string) => {
    const session = await auth();

    if(!session) return parseServerActionResponse({
        error: 'Not singed in',
        status: 'Error',

    });

    const { title, movieId } = Object.fromEntries(
        Array.from(form).filter(([key]) => key != 'description')
    )

    const slug = slugify(title as string, {lower: true, strict: true})

    try{
        const comment = {
            title,
            description,
            slug:{
                _type: slug,
                current: slug,
            },
            movie: {
                _type: 'reference',
                _ref: movieId
            },
            user: {
                _type: 'reference',
                _ref: session?.user?.id,
            }
        }
        const result = await writeClient.create({_type: 'comment', ...comment})
        //console.log(comment);

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

//za update profile:
export const UpdateProfile= async (state: unknown, form: FormData, _id: string) =>{
    const session = await auth();

    //ce uporabnik ni prijavljen
    if(!session) return parseServerActionResponse({
        error: 'Not singed in',
        status: 'Error',

    });

    //pridobi podatke
    const username = form.get("username") as string;
    const bio = form.get("bio") as string;
    let file = form.get("file") as File | null;

    //preveri kako velik je file, kajti file vedno obstaja, samo velikost je 0
    if(file && file.size <= 0){
        file = null;
    }
    try{
        let result;
        //preveri ali se posodobi z sliko vred ali ne. Ce file je, potem se posodobi z njim vred.
        //drugace se posodobijo samo ostali podatki.
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
        //success
        return parseServerActionResponse({
            ...result,
            error: '',
            status: 'SUCCESS'
        })
    }
    //error
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

    //ali je user prijavljen
    if(!session) return parseServerActionResponse({
        error: 'Not singed in',
        status: 'Error',

    });

    //definira se spremenljivka
    const userId = session?.user.id;
    const liked = await writeClient.fetch(LIKE_BY_MOVIE_USER_ID_QUERY, {
        id: _id,
        userId,
    });
    let result;
    if(liked){
        //ce spremenljivka obstaja, se izbrise like
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
        //ce spremenljivka ne obstaja, se doda like
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

    //ali je use prijavljen
    if(!session) return parseServerActionResponse({
        error: 'Not singed in.',
        status: 'Error',

    });
    const userId = session?.user.id;
    const watched = await writeClient.fetch(WATCHED_BY_MOVIE_USER_ID_QUERY, {
        id: _id,
        userId,
    });
    let result;
    if(watched){
        //ce watched onstaja, se izbrise, drugace se v else doda
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

//za watchList
export const Watch_list = async (_id: string) =>{
    const session = await auth();

    //preveri ali je user prijavljen
    if(!session) return parseServerActionResponse({
        error: 'Not singed in.',
        status: 'Error',
    });
    const userId = session?.user.id;
    const watch = await writeClient.fetch(WATCHLIST_BY_MOVIE_USER_ID_QUERY, {
        id: _id,
        userId,
    });
    let result;
    if(watch){
        //ce watch obstaja, se izbrise, ce watch ne obstaja, se v else doda
        try{
            const result = await writeClient
            .patch(watch._id)
            .unset([`movies[_ref=="${_id}"]`])
            .commit()
        return parseServerActionResponse({
            ...result,
            error: '',
            status: 'SUCCESSdislike'
        })
    }
    catch(error){
        return parseServerActionResponse({
            error: JSON.stringify(error),
            status: 'ERROR'
        });
    }
    }
    else{
        const watch = await writeClient.fetch(WATCHLIST_BY_USER_ID_QUERY, {userId})
        try{
        if (watch) {
            result = await writeClient
            .patch(watch._id)
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
                _type: "watchList",
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

export const DeleteComment = async (_id: string, userId: string) =>{
    try{
        const result = await writeClient.delete(_id)
        return parseServerActionResponse({
            ...result,
            error: '',
            status: 'SUCCESS'
        })
    }
    catch(error){
        return parseServerActionResponse({
            error: '500',
            status: 'Could not delete'
        })
    }
}