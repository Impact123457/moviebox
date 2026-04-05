import CommentForm from "@/app/components/CommentForm";
import { redirect } from "next/navigation"
import { auth } from "@/auth";

export default async function Page(){

  const session = await auth();
  
  if (!session) {
    redirect("/");
  }

  return (
    <div className="main flex flex-col items-center justify-between">
      <div className="px-5 my-3 flex flex-col items-center shadow-lg">
        <h1 className="subheading">
        CREATE COMMENT
      </h1>
      <CommentForm />
      </div>
    </div>
  )
}