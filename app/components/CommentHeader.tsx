"use client" //delovanje na brskalniku
import { useState } from "react";
import CommentForm from "./CommentForm";

export default function CommentHeader({_id}:{_id: string}){
    const [showComment, setShowComment] = useState(false); 

    function SetComment(){
        setShowComment(false);
    }
    return(
        <>
            <div className="flex justify-between">
                <h1 className="text-2xl">COMMENTS</h1>                      
                <button onClick={() => {setShowComment(prev => !prev)}
                } className="bg-primary text-white cursor-pointer rounded-2xl px-3 py-2">Comment</button>
            </div>
            <div id="addComment">
                {showComment && <CommentForm _id={_id} onAddComment={SetComment}/>}
            </div>
        </>
    )
}