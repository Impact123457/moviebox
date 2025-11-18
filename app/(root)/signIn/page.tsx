import { auth, signOut, signIn } from "@/auth";
import Link from "next/link";
export default function SignIn(){
    return(
        <section className="signForm">
            <form>
                <h1>Log in</h1>
                    <p>Gmail: </p>
                    <p>Password: </p>
                    <button type="submit" className="uppercase font-bold cursor-pointer">Sign in</button>
            </form>
            <form action={async() => {
                    "use server";
                    await signIn('github')
                }}>
                    <button type="submit" className="uppercase font-bold cursor-pointer">Sign in with github</button>
            </form>
            <Link href="/register">
                <p className="uppercase font-bold">Don't have an account?</p>
            </Link>
        </section>
    );
}
