import { auth, signOut, signIn } from "@/auth";
import Link from "next/link";
export default function SignIn(){
    return(
    <section className="signSection bg-red-500 overflow-hidden">
        <h1 className="text-center py-5 text-2xl font-bold">Welcome back!</h1>
        <form className="signForm" action={async() => {
                "use server";
                await signIn('github')
            }}>
                <input className="input" type="email" id="email" name="email" placeholder="email" /><br></br>
                <input className="input" type="password" id="pass" name="pass" placeholder="password" /><br></br>
                <button type="submit" className="signButton p-2 text-[12px] font-bold text-white bg-gray-300 rounded-[30px] border-[1px] border-white">Sign in</button><br></br>            
                <button type="submit" className="signButton">Sign in with github</button>
        
        <Link href="/register">
            <p>Don't have an account?</p>
        </Link>
        </form>
    </section>
);
}
