"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (!res?.error) window.location.href = "/";
    else alert("Invalid email or password");
  };

  return (
    <section className="signSection">
      <div className="signForms">
        <h2 className="text-2xl text-black font-semibold text-center m-5">Welcome back!</h2>
        <form onSubmit={handleLogin} className="space-y-3">
          <input type="email" className="input" placeholder="email" onChange={(e) => setEmail(e.target.value)} required/>
          <input type="password" className="input" placeholder="password" onChange={(e) => setPassword(e.target.value)} required/>

          <button type="submit" className="logButton border-black bg-black text-white" disabled={loading}>
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>
        {/*GitHub*/}
        <p className="text-center">─────── or ───────</p>
        <button onClick={() => signIn("github", {redirectTo:"/"})} className="logButton bg-white text-black border-black">Login with GitHub</button>
        <p className="text-center">Don’t have an account?{" "}
        <a href="/signUp" className="text-blue-600 underline">Sign up</a>
        </p>
      </div>
    </section>
  );
}