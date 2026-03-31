import { Markdown, Slug, Comment, User } from "@sanity/types.ts"

import { FormatDate } from "@/lib/utils"
import { auth } from "@/auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import markdownit  from "markdown-it";

const md = markdownit();

export type UserType = Omit<User, "name" | "surname" | "username" | "email" | "image" | "imageUrl"> & {
    name?: string | null;
    surname?: string | null;
    username?: string | null;
    email?: string | null;
    image?: string | null;
    imageUrl?: string | null;
}

// Tip podatkov za komentar, ki vključuje opcionalna polja
export type CommentCardType = Omit<Comment, "title" | "slug" | "description" | "user"> & {
    title?: string | null;
    slug?: Slug | null;
    description?: Markdown | null;
    user?: UserType | null;
};

// Komponenta za prikaz enega komentarja (Comment Card)
export default async function CommentCard ({post}:{post: CommentCardType}){

    const session = await auth();
    const ParsedContent = md.render(post?.description || '');

    // Če uporabnik ni prijavljen, ga preusmeri na domačo stran
    if(!session){
        redirect("./");
    }

  return (
    <li className="comment-card">
        <div className="flex-between text-textprimary px-5 py-7 min-h-[50px] rounded-xl">
            <Link href={`/user/${post?.user?._id}`}>
                <div className="flex flex-row">

                    <div>
                        <Image src={`${post?.user?.image || post?.user?.imageUrl || "/defaultProfileImg.png"}`  }  alt='profile picture' height={50} width={50} className='rounded-full mx-3 h-10 w-10' />
                    </div>

                    <div className="flex flex-col">
                        <div className="text-white">
                            {post?.user?.name}
                        </div>

                        <div className="text-sm text-textgray">
                            {post?.user?.email}
                        </div>
                    </div>
                </div>
            </Link>
            <div className="flex flex-row justify-between rounded-xl">
                <div className="bg-primary p-4 rounded-xl max-w-[500px] h-fit">
                    <h1 className="text-2xl">
                        {post?.title}
                    </h1>
                </div>

                <div>
                    <p className="text-textgray text-md bg-primary p-3 rounded-xl">
                        {FormatDate(post?._createdAt)}
                    </p>
                </div>
            </div>
            
            <div className="items-center">
                <div className="bg-primary p-4 rounded-xl h-fit text-textprimary break-all">
                    {ParsedContent ? (
                        <article
                            dangerouslySetInnerHTML={{__html : ParsedContent}}
                        />
                    ) : (
                        <p>no details provided.</p>
                    )}
                </div>
            </div>
        </div>
    </li>
  )
}