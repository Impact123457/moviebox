"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/signUp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();
    setLoading(false);

    if (res.ok) {
      alert("Registration successful! You can now log in.");
      router.push("../login");
    } else {
      alert(data.error || "Something went wrong");
    }
  };

  return (
  <section className="signSection">
    <div className="signForm">
      <h2 className="text-2xl font-semibold text-center m-5">Sign up!</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input className="input" type="text" placeholder="name" value={name} onChange={(e) => setName(e.target.value)} required/>
        <input className="input" type="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
        <input className="input" type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>

      <button className="logButton border-black bg-black text-white" type="submit" disabled={loading}> {loading ? "Registering..." : "Register"} </button>
      </form>
    </div>
  </section>
  );
}